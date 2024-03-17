function Footer() {
  return (
    <footer style={footerStyle}>
      © Marco Moeller - {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;

const footerStyle = {
  textAlign: "center",
  fontSize: "0.8rem",
  color: "#6e8697",
  backgroundColor: "#22231f",
  padding: "2em",
  borderTop: "1px solid whitesmoke"
};
