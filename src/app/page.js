import * as React from 'react';
// Material UI
import Button from '@mui/material/Button';

// Next.js defaults
import Image from "next/image";
import styles from "./page.module.css";

// Custom Components
import EnhancedTable from './TableNFTs';
import MintDialog from './CreateNewNFT';


// Next.js ServerActions
import { getNFTs } from '@/app/actions'


// Hedera env vars
const myAccountId = '0.0.4660077'
const myPrivateKey = '3030020100300706052b8104000a042204205f60d47040795c51770663c2847bcb9c385b740c87edf3c66efbde370954c3ec'
const SupplyKey = '302e020100300506032b657004220420ddba752654ac6b9174911be1166b11855451ded3723452b48789c9bdb6ced40c'
const TokenId = '0.0.4697795'





export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>VitaChain Connect</h1>
        <MintDialog/>
        <Image src="/Built_on_Hedera_White.png" width={373/2} height={170/2} alt="Built on Hedera" />
      </div>
      <br/>
      <div className={styles.description}>
        <EnhancedTable/>
      </div>
    </main>
  );
}


function TransitionState() {
  // TODO: Hedera Topic Service | Message Transaction | post state transition message & associated data
}


