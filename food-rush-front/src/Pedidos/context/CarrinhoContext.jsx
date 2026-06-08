import { createContext, useContext, useState } from "react";

//Contexto global do carrinho, permite que qualquer componente acesse o carrinho

const CarrinhoContext = createContext();

//Provider que envolve a aplicação e disponibiliza o carrinho para todos
export function CarrinhoProvider({children}) {
    const [itens, setItens] = useState([]);
    const [restauranteId, setRestauranteId] = useState(null);
    const [nomeCliente, setNomeCliente] = useState("");

    //Adiciona um item ao carrinho
    const AdicionarItem = (item, restId) => {
        //Garante que todos os itens são do mesmo restaurante
        if (restauranteId && restauranteId !== restId) {
            alert("Você só pode pedir de um restaurante por vez!");
            return;
        }

        setRestauranteId(restId);

        //Se o item já existe, aumenta a quantidade
        const itemExistente = itens.find((i) => i.itemCardapioId == item.id);
        if (itemExistente) {
            setItens(
                itens.map((i) =>
                    i.itemCardapioId === item.id
                    ? {...i, quantidade: i.quantidade + 1}
                    : i
                )
            );
        } else {
            //Adiciona novo item no formato que a API espera
            setItens([
                ...itens,
                {
                    itemCardapioId: item.id,
                    nomeItem: item.nome,
                    precoUnitario: item.preco,
                    quantidade: 1,
                },
            ]);
        }
    };

    //Remove um item do carrinho
    const removerItem = (itemCardapioId) => {
        const novosItens = itens.filter((i) => i.itemCardapioId !== itemCardapioId);
        setItens(novosItens);

        //Se não tem mais itens, limpa o restaurante
        if (novosItens.length === 0) setRestauranteId(null);
    };

    //Limpa o carrinho após finalizar o pedido
    const limparCarrinho = () => {
        setItens([]);
        setRestauranteId(null);
        setNomeCliente("");
    };

    //Calcula o total do carrinho
    const calcularTotal = () =>
        itens.reduce((total, item) => total + item.precoUnitario * item.quantidade, 0);

    return (
        <CarrinhoContext.Provider
          value={{
            itens,
            restauranteId,
            nomeCliente,
            setNomeCliente,
            AdicionarItem,
            removerItem,
            limparCarrinho,
            calcularTotal,
          }}
        >
            {children}
        </CarrinhoContext.Provider>
    );
}

//Hook personalizado para usar o carrinho em qualquer componente
export function useCarrinho() {
    return useContext(CarrinhoContext);
}