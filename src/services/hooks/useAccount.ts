import { useWeb3Auth } from '@web3auth/modal-react-hooks'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import viemRPC from '../viemRPC'

const useAccount = () => {
    const [address, setAddress] = useState<string | null>(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)

    const {web3Auth, userInfo, logout} = useWeb3Auth()
    

    const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {   
        e.preventDefault()  
        logout() 
        setAddress(null)
        setName(null)
        setEmail(null)
    }

    useEffect(() => {
        if (userInfo?.email) {
            if (web3Auth?.provider) {
                viemRPC.getAccounts(web3Auth.provider).then((account) => {
                    setAddress(account)
                })
            }
        }
    }, [userInfo?.email, web3Auth?.provider])

    useEffect(() => {
        const checkAndPostUser = async () => {
            try {
              const response = await axios.get(
                `/api/users?address=${address}`
              );
              setName(response.data.name)
              setEmail(response.data.email)
              console.log({ response: response.data });
            } catch (e) {
              console.log({ error: e });
            }
          };
          if (address) {
            checkAndPostUser();
        }
    }, [address])

  return {address, name, email, handleLogout}
}

export default useAccount   