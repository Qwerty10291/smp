import "./Passwords.css"
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy_icon from './copy_icon.png'
import delete_icon from './delete_icon.png'
import edit_icon from './edit_icon.png'
import Modal from "./Modal";

const NewPasswordModal = ({ onNew }) => {
    let pswd = { site: "", login: "", comm: "", password: "" };
    let onSave = (pswd) => {
        let date = new Date();
        pswd.date = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
        onNew(pswd)
    }
    return (<EditPasswordModal pswd={pswd} onSave={onSave}></EditPasswordModal>)

}

const EditPasswordModal = ({ pswd, onSave }) => {
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
        console.log(alphabet)
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

    return (
        <div className="password__edit__container">
            <div className="password__edit__row">
                <label className="password__edit__row__lbl">Сайт:</label>
                <input className="inpt-text-full" type="text" value={site} onChange={(e) => setSite(e.target.value)} />
            </div>

            <div className="password__edit__row">
                <label className="password__edit__row__lbl">Логин:</label>
                <input className="inpt-text-full" type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
            </div>

            <div className="password__edit__row">
                <label className="password__edit__row__lbl">Комментарий:</label>
                <input className="inpt-text-full" type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>

            <div className="password__edit__row">
                <label className="password__edit__row__lbl">Пароль:</label>
                <input className="inpt-text-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => { setPassword(generatePassword()) }}>New</button>
            </div>
            <div className="password__edit__row">
                <input style={{ maxWidth: "50px" }} type="number" min="1" max="99" value={genPasswordLen} onChange={e => { setGenPasswordLen(Number(e.target.value)) }} />
                <input type="range" min="1" max="99" value={genPasswordLen} onChange={e => { setGenPasswordLen(Number(e.target.value)) }} />
                <input type="checkbox" checked={genPasswordIncludeDigits} onChange={() => { setGenPasswordIncludeDigits(!genPasswordIncludeDigits) }} />
                <label>цифры</label>
                <input type="checkbox" checked={genPasswordIncludeSpecial} onChange={() => { setGenPasswordIncludeSpecial(!genPasswordIncludeSpecial) }} />
                <label>символы</label>
                <input type="checkbox" checked={genPasswordIncludeLowercase} onChange={() => { setGenPasswordIncludeLowercase(!genPasswordIncludeLowercase) }} />
                <label>A-B</label>
                <input type="checkbox" checked={genPasswordIncludeUppercase} onChange={() => { setGenPasswordIncludeUppercase(!genPasswordIncludeUppercase) }} />
                <label>a-b</label>
            </div>
            <button onClick={handleSave}>Сохранить</button>
        </div>
    );
}

const PasswordItem = ({ pswd, deletePswd, changePassword }) => {
    const copy = () => {
        navigator.clipboard.writeText(pswd.password)
        toast('Пароль скопирован!');
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="passwords__item">
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <EditPasswordModal pswd={pswd} onSave={() => { changePassword(pswd); closeModal() }}></EditPasswordModal>
            </Modal>
            <span>{pswd.site}</span>
            <span>{pswd.login}</span>
            <span className="password__item__comm">{pswd.comm.length < 50 ? pswd.comm : pswd.comm.slice(0, 47) + "..."}</span>
            <span>{pswd.date}</span>
            <button onClick={copy} className="btn-password-item btn-password-copy"><img src={copy_icon}></img></button>
            <button onClick={openModal} className="btn-password-item" ><img src={edit_icon}></img></button>
            <button onClick={() => { deletePswd(pswd) }} className="btn-password-item" ><img src={delete_icon}></img></button>
        </div>
    )
}


function Passwords() {
    const [passwords, setPasswords] = useState(
        JSON.parse(localStorage.getItem('passwords') || `[]`)
    );

    useEffect(() => {
        localStorage.setItem('passwords', JSON.stringify(passwords))
    }, [passwords])

    const [nameFilter, setNameFilter] = useState("")
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
        setPasswords(passwords.filter(oldPswd => oldPswd !== pswd))
    }

    const changePassword = (pswd) => {
        const i = passwords.indexOf(pswd)
        if (i > -1) {
            setPasswords([...passwords.slice(0, i), pswd, ...passwords.slice(i + 1)])
        }
    }

    const passwordsFilter = (pswd) => {
        return (nameFilter.length > 0 ? pswd.site.toLowerCase().includes(nameFilter.toLowerCase()) : true) &&
            (loginFilter.length > 0 ? pswd.login.toLowerCase().includes(loginFilter.toLowerCase()) : true) &&
            (passwordFilter.length > 0 ? pswd.password === passwordFilter : true)
    }

    return (
        <div id="passwords__container">
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <NewPasswordModal onNew={newPassword} />
            </Modal>
            <div className="passwords__filters">
                <input value={nameFilter} placeholder="site" className="inpt passwords__filter" onChange={e => setNameFilter(e.target.value)} />
                <input value={loginFilter} placeholder="login" className="inpt passwords__filter" onChange={e => setLoginFilter(e.target.value)} />
                <input value={passwordFilter} placeholder="password" className="inpt passwords__filter" onChange={e => setPasswordFilter(e.target.value)} />
                <button className="btn passwords__add" onClick={openModal}>NEW PASSWORD</button>
            </div>

            <div className="passswords__items">
                {passwords
                    .filter(passwordsFilter)
                    .map(pswd =>
                        <PasswordItem pswd={pswd} deletePswd={deletePassword} changePassword={changePassword} key={pswd.site + pswd.date + pswd.login} />)
                }
            </div>
        </div>
    )
}

export default Passwords;