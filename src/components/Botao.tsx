interface BotaoProps {
  cor?: "green" | "blue" | "gray";
  className?: string;
  children: any;
  onclick?: () => void;
}

function Botao(props: BotaoProps) {
  const cor = props.cor ?? "gray";
  return (
    <button
      onClick={props.onclick}
      className={`bg-gradient-to-r from-${props.cor}-400 to-${props.cor}-700 text-white px-4 py-2 rounded-md ${props.className}`}
    >
      {props.children}
    </button>
  );
}

export default Botao;
