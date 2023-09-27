import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextProps {
    currentUser: string | null;
    login: (name: string, email: string) => void;
    logout: () => void;
}

interface AuthContextProviderProps {
    children: ReactNode;
}


export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [currentUser, setCurrentUser] = useState<string | null>(
        JSON.parse(localStorage.getItem("user") || "null")
    );

    const login = async (name:string, email:string) => {
        try {
            const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include', // Importante para enviar y recibir cookies
              body: JSON.stringify({ name, email }),
            });
      
            if (!response.ok) {
              // Manejar error
              console.error('Error en la autenticación', response);
              return;
            }
      
            const text = await response.text();
            if (text) {
                const userCred: string = text;
                setCurrentUser(userCred);
            }

            console.log('Autenticación exitosa');
          } catch (error) {
            console.error('Error en la solicitud', error);
          }
    };

    async function fetchData() {
      try {
        const response = await fetch('https://frontend-take-home-service.fetch.com/auth/logout',{
          method: 'POST',
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });
        const text = await response.text();
        setCurrentUser(null);
        return text;

      } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
      }
    }

    const logout = async () => {
      try{
        await fetchData();
      }catch (error) {
        console.error('Error on Logout: ', error);
      }
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser])

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>{children}</AuthContext.Provider>
    )
}