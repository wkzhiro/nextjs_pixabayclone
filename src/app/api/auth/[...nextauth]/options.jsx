import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '../../../../firebase'
import { where, collection, getDocs, query } from "firebase/firestore";
import bcrypt from 'bcryptjs';


export const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                // Firestoreからユーザーデータを取得
                const usersRef = collection(db, "registration");
                const q = query(usersRef, where('name', '==', credentials.username));
                // const q = query(usersRef, where("name", "==", credentials.username), where("password", "==", credentials.password));
                const querySnapshot = await getDocs(q);

                // ユーザーが見つかった場合はそのデータを返す
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const user = userDoc.data();
                    // ユーザーのドキュメントIDをコンソールに出力
                    console.log("User ID:", userDoc.id);
                    console.log("User name:", user.name);
                    //ハッシュ用
                    const isValid = bcrypt.compareSync(credentials.password, user.password);
                    if (isValid){
                        return { id: userDoc.id, ...user };}}
                    
                // } else {
                    return null;
                // }


            }
        })
    ],
}