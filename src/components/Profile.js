import { useApi } from "../context/api";

export default function Profile() {
    const {user} = useApi();
    return (
        user && <h1>{user.username}</h1>
    )
}

