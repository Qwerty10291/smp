import "./Passwords.css"
import { useEffect, useState } from "react";
import { Modal, Stack, Checkbox, Tooltip, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Grid, Typography, Slider, FormControlLabel } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete'
import RefreshIcon from '@mui/icons-material/Refresh';

const NewPasswordModal = ({ onCancel, onNew }) => {
    let pswd = { site: "", login: "", comm: "", password: "" };
    let onSave = (pswd) => {
        let date = new Date();
        pswd.date = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
        onNew(pswd)
    }
    return (<EditPasswordModal pswd={pswd} onCancel={onCancel} onSave={onSave}></EditPasswordModal>)
}

const EditPasswordModal = ({ pswd, onCancel, onSave }) => {
    const [site, setSite] = useState(pswd.site);
    const [login, setLogin] = useState(pswd.login);
    const [comment, setComment] = useState(pswd.comm);
    const [password, setPassword] = useState(pswd.password);

    const [genPasswordLen, setGenPasswordLen] = useState(10)
    const [genPasswordIncludeDigits, setGenPasswordIncludeDigits] = useState(true)
    const [genPasswordIncludeSpecial, setGenPasswordIncludeSpecial] = useState(true)
    const [genPasswordIncludeLowercase, setGenPasswordIncludeLowercase] = useState(true)
    const [genPasswordIncludeUppercase, setGenPasswordIncludeUppercase] = useState(true)

    const generatePassword = () => {
        let alphabet = "";
        if (genPasswordIncludeDigits)
            alphabet += "1234567890"
        if (genPasswordIncludeSpecial)
            alphabet += "!\"#$%&\\'()*+,-./:;<=>?@[\\]^_`{|}~"
        if (genPasswordIncludeLowercase)
            alphabet += "abcdefghijklmnopqrstuvwxyz"
        if (genPasswordIncludeUppercase)
            alphabet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (alphabet.length === 0) {
            return ""
        }
        let result = "";
        for (let i = 0; i < genPasswordLen; i++) {
            result += alphabet[Math.floor(alphabet.length * Math.random())]
        }
        return result
    }

    const handleSave = () => {
        if (site.length === 0 || login.length === 0 || password.length === 0) {
            return
        }
        pswd.site = site;
        pswd.login = login;
        pswd.comm = comment;
        pswd.password = password;
        onSave(pswd)
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        bgcolor: 'background.paper',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Box sx={style}>
            <Grid container spacing={2}>
                <Grid item xs={3} sx={{ alignSelf: "center" }}>
                    <Typography>Сайт:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField variant="filled" label="site" sx={{ width: "100%" }} value={site} onChange={(e) => setSite(e.target.value)} />
                </Grid>
                <Grid item xs={3} sx={{ alignSelf: "center" }}>
                    <Typography>Логин:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField variant="filled" label="login" sx={{ width: "100%" }} value={login} onChange={(e) => setLogin(e.target.value)} />
                </Grid>
                <Grid item xs={3} sx={{ alignSelf: "center" }}>
                    <Typography>Комментарий:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField variant="filled" label="commentary" sx={{ width: "100%" }} value={comment} onChange={(e) => setComment(e.target.value)} />
                </Grid>
                <Grid item xs={3} sx={{ alignSelf: "center" }}>
                    <Typography>Пароль:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Stack xs={{ alignItems: "center" }} direction="row" spacing={2}>
                        <TextField variant="filled" label="password" sx={{ width: "100%" }} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Tooltip title="generate">
                            <IconButton onClick={() => { setPassword(generatePassword()) }} aria-label="generate">
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="copy">
                            <IconButton onClick={() => { navigator.clipboard.writeText(password) }} aria-label="generate">
                                <ContentCopyIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
                        <TextField sx={{ maxWidth: "100px" }} type="number" min="1" max="99" value={genPasswordLen} onChange={e => { setGenPasswordLen(Number(e.target.value)) }} />
                        <Slider sx={{ maxWidth: "100px" }} min={1} max={99} value={genPasswordLen} onChange={e => { setGenPasswordLen(Number(e.target.value)) }} />
                        <FormControlLabel control={<Checkbox checked={genPasswordIncludeDigits} onChange={() => { setGenPasswordIncludeDigits(!genPasswordIncludeDigits) }} />} label="цифры" />
                        <FormControlLabel control={<Checkbox checked={genPasswordIncludeSpecial} onChange={() => { setGenPasswordIncludeSpecial(!genPasswordIncludeSpecial) }} />} label="символы" />
                        <FormControlLabel control={<Checkbox checked={genPasswordIncludeLowercase} onChange={() => { setGenPasswordIncludeLowercase(!genPasswordIncludeLowercase) }} />} label="a-b" />
                        <FormControlLabel control={<Checkbox checked={genPasswordIncludeUppercase} onChange={() => { setGenPasswordIncludeUppercase(!genPasswordIncludeUppercase) }} />} label="A-B" />
                    </Stack>
                </Grid>
                <Grid item xs={2}>
                    <Button size="large" color="error" variant="contained" onClick={onCancel}>Отмена</Button>
                </Grid>
                <Grid item xs={7} />
                <Grid item xs={2}>
                    <Button size="large" color="success" variant="contained" onClick={handleSave} >Сохранить</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

const PasswordItem = ({ row, onUpdate, onDelete }) => {
    const copy = () => {
        navigator.clipboard.writeText(row.password)
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (<TableRow
        key={row.site + row.login}
        sx={{ '&:last-child td, &:last-child th': { border: "0" } }}
    >
        <Modal open={isModalOpen} onClose={closeModal}>
            <EditPasswordModal pswd={row} onCancel={closeModal} onSave={(pswd) => { closeModal(); onUpdate(pswd); }} />
        </Modal>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.site}</TableCell>
        <TableCell>{row.comm}</TableCell>
        <TableCell align="right">
            <Tooltip title="copy">
                <IconButton onClick={copy} aria-label="copy">
                    <ContentCopyIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="edit">
                <IconButton onClick={openModal} aria-label="edit">
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="delete">
                <IconButton onClick={() => onDelete(row)} aria-label="delete" sx={{ color: "red" }}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

        </TableCell>
    </TableRow>);
}


function Passwords() {
    const [passwords, setPasswords] = useState(
        JSON.parse(localStorage.getItem('passwords') || `[]`)
    );

    useEffect(() => {
        localStorage.setItem('passwords', JSON.stringify(passwords))
    }, [passwords])

    const [siteFilter, setSiteFilter] = useState("")
    const [loginFilter, setLoginFilter] = useState("")
    const [passwordFilter, setPasswordFilter] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const newPassword = (pswd) => {
        setPasswords([...passwords, pswd])
        closeModal()
    }

    const deletePassword = (pswd) => {
        if (window.confirm("Вы уверены что хотите удалить данный пароль?")) {
            setPasswords(passwords.filter(oldPswd => oldPswd !== pswd))
        }
    }

    const changePassword = (pswd) => {
        const i = passwords.indexOf(pswd)
        if (i > -1) {
            setPasswords([...passwords.slice(0, i), pswd, ...passwords.slice(i + 1)])
        }
    }

    const passwordsFilter = (pswd) => {
        return (siteFilter.length > 0 ? pswd.site.toLowerCase().includes(siteFilter.toLowerCase()) : true) &&
            (loginFilter.length > 0 ? pswd.login.toLowerCase().includes(loginFilter.toLowerCase()) : true) &&
            (passwordFilter.length > 0 ? pswd.password === passwordFilter : true)
    }

    return (
        <div>
            <Modal open={isModalOpen} onClose={closeModal}>
                <NewPasswordModal onNew={newPassword} onCancel={closeModal} />
            </Modal>
            <Stack sx={{height: "100%"}} spacing={4}>
                <Stack direction="row" spacing={2}>
                    <TextField value={siteFilter} onChange={e => setSiteFilter(e.target.value)} variant="filled" label="site" />
                    <TextField value={loginFilter} onChange={e => setLoginFilter(e.target.value)} variant="filled" label="login" />
                    <TextField value={passwordFilter} onChange={e => setPasswordFilter(e.target.value)} variant="filled" label="password" type="password" />
                    <Button variant="contained" sx={{ marginLeft: "auto !important" }} onClick={openModal}>Новый</Button>
                </Stack>
                <Paper sx={{ width: "100%" }}>
                    <TableContainer sx={{maxHeight: "75vh"}}>
                        <Table stickyHeader aria-label="passwords">
                            <colgroup>
                                <col width="5%" />
                                <col width="15%" />
                                <col width="60%" />
                                <col width="10%" />
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Дата</TableCell>
                                    <TableCell>Сайт</TableCell>
                                    <TableCell>Комментарий</TableCell>
                                    <TableCell align="center">Действия</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {passwords.filter(passwordsFilter).map((row) =>
                                    <PasswordItem row={row} onUpdate={changePassword} onDelete={deletePassword} />
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

            </Stack>
        </div>

    )
}

export default Passwords;