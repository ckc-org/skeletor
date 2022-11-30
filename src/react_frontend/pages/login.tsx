import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import card_theme from '../themes/card_theme.js'
import input_theme from '../themes/input_theme.js'
import {Alert, Box, Button, Card, CardActions, CardContent, FormHelperText, ThemeProvider} from '@mui/material'
import TextField from '@mui/material/TextField'
import {is_logged_in, login} from '../services/auth'



const LoginCard = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [form_error, setFormError] = useState({
        error: ''
    });
    const router = useRouter()

    const handle_text_input = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target?.name]: e.target?.value})
    }
    const handle_submit = async () => {
        const resp = await login(form.email, form.password)
        if (resp && resp.status === 200) {
            await router.push('/')
        } else {
            setFormError({...form_error, error: 'Oops! We could not log you in with the provided credentials'})
        }
    }
    const logged_in = async () => {
        const resp = await is_logged_in()
        if(resp && resp.status === 200) {
            await router.push('/')
        } else {
            await router.push('/login')
        }
    }
    useEffect(() => { logged_in() }, [])
    const LoginError = () => {
        if (!!form_error.error) {
            return (
                <Alert severity="error">{ form_error.error }</Alert>
            )
        } else {
            return(<></>)
        }
    }
    return (
        <ThemeProvider theme={card_theme}>
            <Box
                component="div"
                sx={{
                    '& > :not(style)': { paddingTop: 0, marginTop: 30, width: '25%' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card>
                    <h1 style={{ color: card_theme.palette.text.primary, backgroundColor: card_theme.palette.primary.main, marginTop: 0, padding: 10}}>Login</h1>
                    <ThemeProvider theme={input_theme}>
                        <CardContent>
                            <Box
                                component="form"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <LoginError/>
                                <TextField
                                    name="email"
                                    label="Email"
                                    variant="standard"
                                    value={form.email}
                                    onChange={handle_text_input}
                                />
                                <TextField
                                    style={{ marginTop: '10px'}}
                                    name="password"
                                    label="Password"
                                    variant="standard"
                                    value={form.password}
                                    onChange={handle_text_input}
                                />
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button size="small">New Account</Button>
                            <Button
                                type="submit"
                                size="small"
                                onClick={handle_submit}
                            >
                                Login
                            </Button>
                        </CardActions>
                    </ThemeProvider>
                </Card>
            </Box>
        </ThemeProvider>
    )
}



export default function Home() {
    return (
        <LoginCard/>
    )
}
