import { useAppContext } from "../context"

export default function Header() {
    const { username } = useAppContext();
    console.log(username);
    return <div>
        <span>{username}</span>
    </div>
}