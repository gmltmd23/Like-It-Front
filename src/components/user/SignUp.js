import * as React from 'react';
import { useState, useNavigate } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider, Container, Typography, 
            Box, Grid, Checkbox, FormControlLabel,
            TextField, CssBaseline, Button, Avatar, FormHelperText } from '@mui/material/';
import axios from 'axios';

const theme = createTheme();

export default function SignUp() {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSamePassword, setIsSamePassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [isAgree, setIsAgree] = useState(false);

    const handleAgree = (event) => {
        setIsAgree(event.target.checked);
    };

    const handlePost = async (data) => {
        const baseUrl = 'http://localhost:8080'
        const {email, password, name} = data;
        const postData = {email, password, name};

        await axios
            .post(baseUrl + '/user/signup', postData)
            .then((response) => {
                alert("회원가입에 성공하였습니다.");
                console.log(response, "회원가입 성공!!");
            })
            .catch((error) => {
                alert("회원가입에 실패하였습니다.");
                console.log(error, "회원가입 실패");
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let okayCount = 0;
        const receivedData = new FormData(event.currentTarget);
        const userData = {
            email: receivedData.get('email'),
            password: receivedData.get('password'),
            rePassword: receivedData.get('rePassword'),
            name: receivedData.get('name')
        };
        const { email, password, rePassword, name } = userData;

        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if(!emailRegex.test(email)) {
            setEmailError("이메일 형식에 맞지 않습니다.");
        }
        else {
            setEmailError("");
            okayCount++;
        }

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if(!passwordRegex.test(password)) {
            setPasswordError("패스워드는 숫자+영문자+특수문자 조합으로 8자리 이상이어야 합니다.");
        }
        else {
            setPasswordError("");
            okayCount++;
        }

        if(password !== rePassword) {
            setIsSamePassword("비밀번호가 일치하지 않습니다.");
        }
        else {
            setIsSamePassword("");
            okayCount++;
        }
        
        const nameRegex = /^[가-힣a-zA-Z]+$/;
        if(!nameRegex.test(name)) {
            setNameError("올바른 이름을 입력하세요.");
        }
        else {
            setNameError("");
            okayCount++;
        }

        if(!isAgree) {
            alert("회원 가입 약관에 동의하셔야 가입할 수 있습니다.");
        }
        else {
            okayCount++;
        }

        if(okayCount === 5) {
            handlePost(userData);
        }
    };

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Like It 회원가입
            </Typography>
            <Box 
            component="form" 
            noValidate 
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="이메일"
                        placeholder='test@test.com'
                        error={emailError !== '' || false}
                        autoFocus
                        />
                    </Grid>
                    <span>　</span><FormHelperText>{emailError}</FormHelperText>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="password"
                        name="password"
                        label="패스워드"
                        type="password"
                        error={passwordError !== '' || false}
                        placeholder='*********'
                        />
                    </Grid>
                    <span>　</span><FormHelperText>{passwordError}</FormHelperText>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            type="password"
                            id="rePassword"
                            name="rePassword"
                            label="패스워드 재입력"
                            error={isSamePassword !== '' || false}
                            placeholder='*********'
                        />
                    </Grid>
                    <span>　</span><FormHelperText>{isSamePassword}</FormHelperText>
                    <Grid item xs={12}>
                        <TextField
                        id="name"
                        name="name"
                        label="이름"
                        required
                        fullWidth
                        error={nameError !== '' || false}
                        placeholder='홍길동'
                        />
                    </Grid>
                    <span>　</span><FormHelperText>{nameError}</FormHelperText>
                    <Grid item xs={12}>
                        <FormControlLabel
                        control={<Checkbox onChange={handleAgree} color="primary" />}
                        label="회원가입에 동의 합니다."
                        />
                    </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                회원가입
                </Button>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}