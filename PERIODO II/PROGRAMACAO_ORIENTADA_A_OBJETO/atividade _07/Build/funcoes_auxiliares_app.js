import prompt from "prompt-sync";
import { Conta, Poupanca } from "./Conta.js";
//>>>>>>>>>>>>>>>>>>MENU APP.JS<<<<<<<<<<<<<<<<<<<<<<
let input = prompt();
// FUNCAO DA OPCAO 1
export function cadrastrar(banco) {
    console.log("\nCadastrar conta\n");
    let numero = input('Digite o número da conta:');
    let titular = input('Digite o nome do(a) titular da conta: ');
    let saldo = Number(input('Digite o saldo da conta (R$): '));
    let tipo_da_conta = Number(input('Digite o tipo da conta=> 0-Conta  1-Poupança:  '));
    let conta;
    if (tipo_da_conta == 0)
        conta = new Conta(numero, titular, saldo);
    else
        conta = new Poupanca(numero, titular, saldo, 0);
    banco.inserir(conta);
    console.log("\n");
    console.log(banco);
    console.log("\n");
}
// FUNCAO DA OPCAO 2
export function consultar(banco) {
    let numero_da_conta = input("Digite o numero da conta:");
    let conta;
    for (const conta_atual of banco.getContas()) {
        if (conta_atual.getNumero() == numero_da_conta) {
            conta = conta_atual;
        }
    }
    return conta;
}
// FUNCAO DA OPCAO 3
export function sacar(banco, id_conta, valor_saque) {
    let conta_pesquisada = banco.consultar(id_conta);
    if (conta_pesquisada != undefined) {
        conta_pesquisada.sacar(valor_saque);
    }
}
// FUNCAO DA OPCAO 4
export function depositar(banco, id_conta_deposito, valor_deposito) {
    let conta_pesquisada = banco.consultar(id_conta_deposito);
    //FAIL FAST
    if (conta_pesquisada == null) {
        input("Conta nao existente! presssione <enter>.");
    }
    else {
        conta_pesquisada.depositar(valor_deposito);
    }
}
// FUNCAO DA OPCAO 5
export function excluir_conta(banco, id_conta_a_ser_excluida) {
    //fail fast
    if (banco.consultar(id_conta_a_ser_excluida) == undefined) {
        return;
    }
    banco.excluir(id_conta_a_ser_excluida);
}
// FUNCAO DA OPCAO 6
export function realizar_deposito(banco, id_conta_origem, id_conta_destino, valor_da_transferencia) {
    let conta_origem = banco.consultar(id_conta_origem);
    let conta_destino = banco.consultar(id_conta_destino);
    let verifica_se_ambas_contas_existem = conta_origem != undefined && conta_destino != undefined;
    if (verifica_se_ambas_contas_existem) {
        if (conta_origem.sacar(valor_da_transferencia) == true) {
            conta_destino.depositar(valor_da_transferencia);
        }
        else {
            console.log("\n\nNao ha saldo suficiente para realizar a transferencia!!!!\n\n");
        }
    }
}
// FUNCAO DA OPCAO 7
export function somar_dos_valores_das_contas_existentes(banco) {
    return banco.somar_saldo_de_todas_as_contas();
}
// FUNCAO DA OPCAO 8
export function render_juros_em_uma_conta_poupanca(banco, numero_da_conta_poupanca) {
    return banco.renderJuros(numero_da_conta_poupanca);
}
// FUNCAO DA OPCAO 9
export function salvar_os_dados_no_arquivo(banco) {
    banco.salvarEmArquivo();
}
// FUNCAO DA OPCAO 10
export function carregar_os_dados_a_partir_do_arquivo(banco) {
    banco.carregarDeArquivo();
}
