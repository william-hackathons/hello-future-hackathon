'use server'


// Hedera Imports
const { 
    Client,
    Hbar,
    PrivateKey,
    TopicCreateTransaction,
    TopicMessageSubmitTransaction,
    TokenMintTransaction,
    AccountBalanceQuery,
    NftId,
    TokenId,
    TokenNftInfoQuery,
} = require("@hashgraph/sdk");


//
//	Server Actions
//

export async function mintNFT(antigens, rhfactor, donationtype, litres) {
  'use server'
  // Hedera env vars
  const myAccountId = '0.0.4660077'
  const myPrivateKey = '3030020100300706052b8104000a042204205f60d47040795c51770663c2847bcb9c385b740c87edf3c66efbde370954c3ec'
  const supplyKey = '302e020100300506032b657004220420ddba752654ac6b9174911be1166b11855451ded3723452b48789c9bdb6ced40c'
  const tokenId = '0.0.4697795'

  //
  //  Init Client
  //

  //Create your Hedera Testnet client
  const client = Client.forTestnet();
  //Set your account as the client's operator
  client.setOperator(myAccountId, myPrivateKey);
  //Set the default maximum transaction fee (in Hbar)
  client.setDefaultMaxTransactionFee(new Hbar(100));
  //Set the maximum payment for queries (in Hbar)
  client.setDefaultMaxQueryPayment(new Hbar(50));

  //
  //  Create FSM Topic
  //

  // Create a new topic
  let txResponse = await new TopicCreateTransaction().execute(client);

  // Grab the newly generated topic ID
  let receipt = await txResponse.getReceipt(client);
  let topicId = receipt.topicId;
  console.log(`Your topic ID is: ${topicId}`);

  // Wait 5 seconds between consensus topic creation and subscription creation
  await new Promise((resolve) => setTimeout(resolve, 5000));

  //
  //  Post initialization data Message to Topic
  //

  // Strings Factory
  var current_date = new Date()
  current_date = current_date.getDate() + "/" + (current_date.getMonth()+1)  + "/" + current_date.getFullYear() + " @ " + current_date.getHours() + ":" + current_date.getMinutes() + ":" + current_date.getSeconds();
  const message_string = "{'timestamp': " + current_date + ", 'transition': 'Created', 'data': { 'phenotype': " + antigens + rhfactor + ", 'litres': " + litres + ", 'donationtype': " + donationtype + ", }}"

  // Send message to the topic
  let sendResponse = await new TopicMessageSubmitTransaction({
    topicId: topicId,
    message: message_string,
  }).execute(client);

  // Get the receipt of the transaction
  const getReceipt = await sendResponse.getReceipt(client);

  // Get the status of the transaction
  const transactionStatus = getReceipt.status
  console.log("The message transaction status " + transactionStatus.toString())

  //
  //  Mint NFT
  //

  // Max transaction fee as a constant
  const maxTransactionFee = new Hbar(20);

  // Reformat Strings
  const metadataArray = [
  	Buffer.from(
  		topicId.toString()
  	),
  ]

  // MINT NEW BATCH OF NFTs
  const mintTx = new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata(metadataArray) //Batch minting - UP TO 10 NFTs in single tx
      .setMaxTransactionFee(maxTransactionFee)
      .freezeWith(client);

  //Sign the transaction with thesupply key
  const mintTxSign = await mintTx.sign(PrivateKey.fromString(supplyKey));

  //Submit the transaction to a Hedera network
  const mintTxSubmit = await mintTxSign.execute(client);

  //Get the transaction receipt
  const mintRx = await mintTxSubmit.getReceipt(client);

  //Log the serial number
  console.log("Created NFT " + tokenId + " with serial number: " + mintRx.serials);
}





export async function getNFTs() {
	'use server'
	// Hedera env vars
	const myAccountId = '0.0.4660077'
	const myPrivateKey = '3030020100300706052b8104000a042204205f60d47040795c51770663c2847bcb9c385b740c87edf3c66efbde370954c3ec'
	const supplyKey = '302e020100300506032b657004220420ddba752654ac6b9174911be1166b11855451ded3723452b48789c9bdb6ced40c'
	const tokenId = '0.0.4697795'

	//
	//  Init Client
	//

 	//Create your Hedera Testnet client
 	const client = Client.forTestnet();
 	//Set your account as the client's operator
 	client.setOperator(myAccountId, myPrivateKey);
 	//Set the default maximum transaction fee (in Hbar)
 	client.setDefaultMaxTransactionFee(new Hbar(100));
 	//Set the maximum payment for queries (in Hbar)
 	client.setDefaultMaxQueryPayment(new Hbar(50));


    var balanceCheckTx = await new AccountBalanceQuery().setAccountId(myAccountId).execute(client);
    var numNFTs = balanceCheckTx.tokens._map.get(tokenId.toString())

    var index = 0
    while (index < numNFTs) {
        const serialNFTid = new NftId(TokenId.fromString(tokenId), index+1)

        //Returns the info for the specified NFT ID
        const nftInfo = await new TokenNftInfoQuery()
            .setNftId(serialNFTid)
            .execute(client);
        
        console.log(Buffer.from(JSON.parse(nftInfo.toString()).metadata, 'hex').toString())

        index = index + 1
    }

    // TODO: Figure out how to return TopicIDs from server action to table component on client
}





