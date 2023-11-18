import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { keccak256, toUtf8Bytes } from 'ethers/lib/utils'
import {MetadataApi} from '@cowprotocol/app-data'

// Sorry, it's a magic, we should import it to make MetadataApi work
console.log('Ethers utils', {keccak256, toUtf8Bytes})

export const metadataApi = new MetadataApi()

const appCode = 'YOUR_APP_CODE'
const environment = 'prod'
const referrer = {address: '0xfb3c7eb936cAA12B5A884d612393969A557d4307'}

const quote = {slippageBips: '0.5'} // Slippage percent, it's 0 to 100
const orderClass = {orderClass: 'market'} // "market" | "limit" | "liquidity"

function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        (async function () {
            const appDataDoc = await metadataApi.generateAppDataDoc({
                appCode,
                environment,
                metadata: {
                    referrer,
                    quote,
                    orderClass
                },
            })

            console.log('[MetadataApi] appDataDoc', appDataDoc)

            const {cid, appDataHex} = await metadataApi.appDataToCid(appDataDoc)
            console.log('[MetadataApi] appDataHex', appDataHex)
            console.log('[MetadataApi] cid', cid)

// 💡🐮 You should use appDataHex as the appData value in the CoW Order. "cid" Identifies the metadata associated to the CoW order in IPFS

// You can derive the CID from the appDataHex of any order
            const actualCid = await metadataApi.appDataHexToCid(appDataHex)
            console.log('[MetadataApi] actualCid', {cid, actualCid}, cid === actualCid) // Should be true
        })()
    }, [])

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
