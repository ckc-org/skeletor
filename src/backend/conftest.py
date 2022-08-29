import contextlib
import os
import pytest
import filelock


# Thanks to christopheraranda for the lock & serial execution solutions:
# https://github.com/pytest-dev/pytest-xdist/issues/84#issuecomment-617566804
#
# Using this pattern we can run all of our normal tests in parallel quickly,
# but each test requiring elasticsearch server to be cleared/rebuilt will
# run one-after-the-other (serially)

@pytest.fixture(scope='session')
def lock(tmp_path_factory):
    """Leverages the filelock module"""
    base_temp = tmp_path_factory.getbasetemp()
    lock_file = base_temp.parent / 'serial.lock'
    yield filelock.FileLock(lock_file=str(lock_file))
    with contextlib.suppress(OSError):
        os.remove(path=lock_file)


@pytest.fixture()
def serial(lock):
    """Makes tests marked with 'serial' run one-at-a-time while other tests, using pytest-xdist,
    are allowed to continue running in parallel

    Usage:
        @pytest.mark.usefixtures("serial")
        def test_some_thing(...)
    """
    with lock.acquire(poll_interval=.25):
        yield
