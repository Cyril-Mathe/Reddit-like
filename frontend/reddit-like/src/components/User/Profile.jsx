import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

export default function Profile() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [user, SetUser] = useState('')
    const [image, setImage] = useState([])
    const [newimage, setNewImage] = useState([])
    const [updated, setUpdated] = useState(false)
    let navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userid = token ? jwtDecode(token).id : null
    const url = `http://localhost:1337/api/users/${userid}?populate=avatar`
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function fetchUser() {
        setLoading(true)
        try {
            const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json()
            SetUser(data)
            if (data.avatar == null) {
                setImage(null)
            } else {
                setImage(data.avatar.url)
            }
        } catch (error) {
            setError(error)
            return
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        SetUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmiteName = async (event) => {
        event.preventDefault();

        try {
            const name = {
                username: user.username
            }
            const {status} = await axios.put(url, name, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
            setUpdated(!updated)
            alert("Votre nom à été modifier avec succès !");
            if(status === 200) navigate("/profile")
        } catch (error2) {
            return error2
        }
    }

    const handleSubmiteMail = async (event) => {
        event.preventDefault();

        try {
            const mail = {
                email: user.email
            }
            const {status} = await axios.put(url, mail, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
            setUpdated(!updated)
            alert("Votre mail à été modifier avec succès !");
            if(status === 200) navigate("/profile")
        } catch (error2) {
            return error2
        }
    }

    const handleImage = event => {
        setNewImage(Array.from(event.target.files))
    }

    const handleSubmitImage = async (event) => {
        event.preventDefault();
        
        try {
            let fileIds = [];

            if (newimage.length > 0) {
                const formData = new FormData();
                newimage.forEach(file => formData.append('files', file))

                const img = await axios.post('http://localhost:1337/api/upload',
                    formData,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                )
                const uploaded = img.data[0]
                fileIds = [ uploaded.id ]
            }

            const userimage = {
                ...(fileIds.length > 0 && { avatar: fileIds })
            }
            const {status} = await axios.put(url, userimage, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
            setUpdated(!updated)
            alert("Votre avatar à été modifier avec succès !");
            if(status === 200) navigate("/profile")
        } catch (error2) {
            return error2
        }
    };

    const handleSubmitPassword = async (event) => {
        event.preventDefault()

        try {
            if (newPassword !== confirmPassword) {
            return alert('Le mot de passe et la confirmation ne correspondent pas');
            }
            if (!window.confirm('Confirmer le changement de mot de passe ?')) return;
            const {status} = await axios.post('http://localhost:1337/api/auth/change-password',
                {
                currentPassword: currentPassword,
                password: newPassword,
                passwordConfirmation: confirmPassword,
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }
            )
            alert("Votre mot de passe à été modifier avec succès !");
            if(status === 200) navigate("/profile")
        } catch (error2) {
            return error2
        }
    }

    useEffect(() => {
        fetchUser()
    }, [updated])

    return(
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {user && (
                <div className='min-h-screen bg-[#e8f4e8]'>
                    <div>Avatar 
                        {image && (
                        <img
                        src={`http://localhost:1337${image}`}
                        alt="Illustration"
                        className="w-full h-auto"
                        />
                        )}
                    </div>
                    <form onSubmit={handleSubmitImage}>
                        <input
                        type='file'
                        name='files'
                        onChange={handleImage}
                        />
                        <button type='submit'>Changer d'avatar</button>
                    </form>
                    <div>Name {user.username}</div>
                    <form onSubmit={handleSubmiteName}>
                        <input
                        name='username'
                        value={user.username}
                        onChange={handleChange}
                        />
                        <button type='submit'>Modifier</button>
                    </form>
                    <div>Mail {user.email}</div>
                    <form onSubmit={handleSubmiteMail}>
                        <input
                        name='email'
                        value={user.email}
                        onChange={handleChange}
                        />
                        <button type='submit'>Modifier</button>
                    </form>
                    <form onSubmit={handleSubmitPassword}>
                        <div>Changer de mot de passe</div>
                        <input type="password"
                        placeholder='Mot de passe actuel'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input
                        type='password'
                        placeholder='Nouveau mot de passe'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                        type="password"
                        placeholder="Confirmer mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type='submit'>Confirmer</button>
                    </form>
                </div>
            )}
            
            {/* <Sidebar /> */}
        </div>
    )
}