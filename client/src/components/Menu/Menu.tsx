import "./Menu.css";

function Menu({ menu }: { menu: string }) {
  return <iframe src={`${menu}#toolbar=0`} title="menu" />;
}

export default Menu;
