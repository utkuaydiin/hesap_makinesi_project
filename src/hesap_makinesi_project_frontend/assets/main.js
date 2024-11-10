import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../.dfx/local/canisters/hesap_makinesi_project_backend/hesap_makinesi_project_backend.did.js";

let hesapMakinesi;

async function initializeActor() {
  const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
  const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });

  if (process.env.NODE_ENV !== "production") {
    try {
      await agent.fetchRootKey();
    } catch (err) {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    }
  }

  hesapMakinesi = Actor.createActor(idlFactory, { agent, canisterId });
  console.log('Canister ID:', canisterId);
  console.log('Actor created:', hesapMakinesi);
}

async function updateResult(value) {
  console.log('Updating result with:', value);
  document.getElementById("result").innerText = `Sonuç: ${value}`;
}

async function add() {
  const number = parseInt(document.getElementById("inputNumber").value);
  console.log('Attempting to add number:', number);
  try {
    console.log('Calling backend ekle method...');
    const result = await hesapMakinesi.ekle(number);
    console.log('Backend responded with:', result);
    updateResult(result);
  } catch (error) {
    console.error('Detailed error:', error);
    updateResult('Error: ' + error.message);
  }
}

async function sub() {
  const number = parseInt(document.getElementById("inputNumber").value);
  try {
    const result = await hesapMakinesi.cikar(number);
    updateResult(result);
  } catch (error) {
    console.error('Error subtracting:', error);
  }
}

async function mul() {
  const number = parseInt(document.getElementById("inputNumber").value);
  try {
    const result = await hesapMakinesi.carp(number);
    updateResult(result);
  } catch (error) {
    console.error('Error multiplying:', error);
  }
}

async function div() {
  const number = parseInt(document.getElementById("inputNumber").value);
  try {
    const result = await hesapMakinesi.bol(number);
    updateResult(result ?? "Division by zero");
  } catch (error) {
    console.error('Error dividing:', error);
  }
}

async function temizle() {
  try {
    await hesapMakinesi.temizle();
    updateResult(0);
  } catch (error) {
    console.error('Error clearing:', error);
  }
}

async function initializeCalculator() {
  try {
    updateResult(0);
  } catch (error) {
    console.error('Error initializing calculator:', error);
    updateResult(0);
  }
}

async function testBackendConnection() {
  try {
    console.log('Testing backend connection...');
    const result = await hesapMakinesi.ekle(5);
    console.log('Backend test successful, result:', result);
    return true;
  } catch (error) {
    console.error('Backend connection test failed:', error);
    return false;
  }
}

async function init() {
  await initializeActor();
  await initializeCalculator();
  await testBackendConnection();
}

window.addEventListener('load', init);
document.getElementById("addButton").addEventListener("click", add);
document.getElementById("subButton").addEventListener("click", sub);
document.getElementById("mulButton").addEventListener("click", mul);
document.getElementById("divButton").addEventListener("click", div);
document.getElementById("clearButton").addEventListener("click", temizle);
