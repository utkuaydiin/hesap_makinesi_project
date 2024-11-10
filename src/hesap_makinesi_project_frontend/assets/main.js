import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./.dfx/local/canisters/hesap_makinesi_project_backend/hesap_makinesi_project_backend.did";

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" }); 
const hesapMakinesi = Actor.createActor(idlFactory, {
  agent,
  canisterId: "bkyz2-fmaaa-aaaaa-qaaaq-cai", 
});


async function updateResult(value) {
  document.getElementById("result").innerText = `Sonuç: ${value}`;
}


async function add() {
  try {
    const number = parseInt(document.getElementById("inputNumber").value);
    const result = await hesapMakinesi.ekle(number); 
    updateResult(result);
  } catch (error) {
    console.error("Error during add operation:", error);
  }
}

async function sub() {
  try {
    const number = parseInt(document.getElementById("inputNumber").value);
    const result = await hesapMakinesi.cikar(number); 
    updateResult(result);
  } catch (error) {
    console.error("Error during subtract operation:", error);
  }
}

async function mul() {
  try {
    const number = parseInt(document.getElementById("inputNumber").value);
    const result = await hesapMakinesi.carp(number); 
    updateResult(result);
  } catch (error) {
    console.error("Error during multiply operation:", error);
  }
}

async function div() {
  try {
    const number = parseInt(document.getElementById("inputNumber").value);
    const result = await hesapMakinesi.bol(number);
    updateResult(result ?? "Division by zero");
  } catch (error) {
    console.error("Error during divide operation:", error);
  }
}

async function temizle() {
  try {
    await hesapMakinesi.temizle(); 
    updateResult(0);
  } catch (error) {
    console.error("Error during clear operation:", error);
  }
}


document.getElementById("addButton").addEventListener("click", add);
document.getElementById("subButton").addEventListener("click", sub);
document.getElementById("mulButton").addEventListener("click", mul);
document.getElementById("divButton").addEventListener("click", div);
document.getElementById("clearButton").addEventListener("click", temizle);
