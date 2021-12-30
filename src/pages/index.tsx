import { useEffect, useState } from "react";
import ColecaoCliente from "../backend/db/ColecaoCliente";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";

export default function Home() {
  const [visivel, setVisivel] = useState<"form" | "tab">("tab");
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const repo: ClienteRepositorio = new ColecaoCliente();

  useEffect(() => obterTodos, []);

  function obterTodos() {
    repo.obterTodos().then((clientes) => {
      setClientes(clientes);
      setVisivel("tab");
    });
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    setVisivel("form");
  }

  function novoCliente() {
    setCliente(Cliente.vazio());
    setVisivel("form");
  }

  async function clienteExcluido(cliente: Cliente) {
    await repo.excluir(cliente);
    obterTodos()
  }

  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
  }

  return (
    <div
      className={`
      flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white
    `}
    >
      <Layout Title="Cadastro Simples">
        {visivel === "tab" ? (
          <>
            <div className="flex justify-end">
              <Botao onclick={novoCliente} className="mb-4" cor="green">
                Novo Cliente
              </Botao>
            </div>
            <Tabela
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido}
            ></Tabela>
          </>
        ) : (
          <Formulario
            cliente={cliente}
            cancelar={() => setVisivel("tab")}
            clienteMudou={salvarCliente}
          />
        )}
      </Layout>
    </div>
  );
}
