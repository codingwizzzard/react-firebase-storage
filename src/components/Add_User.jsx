import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";

function Add_User() {
    const [user, setUser] = useState({});
    const [list, setList] = useState([]);
    const [editId, setEditId] = useState("");

    useEffect(() => {
        getData();
    }, []);

    let handleChange = (e) => {
        let { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    let getData = async () => {
        try {
            let res = await getDocs(collection(db, "users"));
            let allData = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setList(allData);
        } catch (error) {
            console.log(error);
        }
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId == "") {
                await addDoc(collection(db, "users"), user);
            } else {
                let obj = {
                    username: user.username,
                    password: user.password,
                };
                await updateDoc(doc(db, "users", editId), obj);
                setEditId("");
            }
            setUser({});
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    let handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    let handleEdit = (user) => {
        setUser(user);
        setEditId(user.id);
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Add User Data</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={user.username || ""}
                        onChange={handleChange}
                        placeholder="Enter username"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={user.password || ""}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    {editId ? "Update User" : "Add User"}
                </button>
            </form>

            <table className="table table-striped table-bordered text-center">
                <thead className="table-dark">
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm me-2"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleEdit(user)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {list.length == 0 && <p className="text-center mt-3">No users found.</p>}
        </div>
    );
}

export default Add_User;