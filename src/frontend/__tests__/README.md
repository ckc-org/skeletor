# Testing

Current tests are written with a combo of @vue/test-utils and @testing-library/vue. @testing-library/vue is built on top of @vue/test-utils, so when in doubt, just revert back to test-utils.


To Run: `yarn test`


#####@testing-library/vue's render method returns this object of utils for us:
````
{
     container: HTMLDivElement {},
     baseElement: HTMLBodyElement {},
     debug: [Function: debug],
     unmount: [Function: unmount],
     isUnmounted: [Function: isUnmounted],
     html: [Function: html],
     emitted: [Function: emitted],
     updateProps: [Function: updateProps],
     queryAllByLabelText: [Function: bound ],
     queryByLabelText: [Function: bound ],
     getAllByLabelText: [Function: bound ],
     getByLabelText: [Function: bound ],
     findAllByLabelText: [Function: bound ],
     findByLabelText: [Function: bound ],
     queryByPlaceholderText: [Function: bound ],
     queryAllByPlaceholderText: [Function: bound ],
     getByPlaceholderText: [Function: bound ],
     getAllByPlaceholderText: [Function: bound ],
     findAllByPlaceholderText: [Function: bound ],
     findByPlaceholderText: [Function: bound ],
     queryByText: [Function: bound ],
     queryAllByText: [Function: bound ],
     getByText: [Function: bound ],
     getAllByText: [Function: bound ],
     findAllByText: [Function: bound ],
     findByText: [Function: bound ],
     queryByDisplayValue: [Function: bound ],
     queryAllByDisplayValue: [Function: bound ],
     getByDisplayValue: [Function: bound ],
     getAllByDisplayValue: [Function: bound ],
     findAllByDisplayValue: [Function: bound ],
     findByDisplayValue: [Function: bound ],
     queryByAltText: [Function: bound ],
     queryAllByAltText: [Function: bound ],
     getByAltText: [Function: bound ],
     getAllByAltText: [Function: bound ],
     findAllByAltText: [Function: bound ],
     findByAltText: [Function: bound ],
     queryByTitle: [Function: bound ],
     queryAllByTitle: [Function: bound ],
     getByTitle: [Function: bound ],
     getAllByTitle: [Function: bound ],
     findAllByTitle: [Function: bound ],
     findByTitle: [Function: bound ],
     queryByRole: [Function: bound ],
     queryAllByRole: [Function: bound ],
     getAllByRole: [Function: bound ],
     getByRole: [Function: bound ],
     findAllByRole: [Function: bound ],
     findByRole: [Function: bound ],
     queryByTestId: [Function: bound ],
     queryAllByTestId: [Function: bound ],
     getByTestId: [Function: bound ],
     getAllByTestId: [Function: bound ],
     findAllByTestId: [Function: bound ],
     findByTestId: [Function: bound ]
}
````
