const vh =
  Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  ) - 120;

export const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "25px",
  flexDirection: "column",
  gap: "10px",
};
export const title = { fontSize: "25px" };
export const nftsCotnainer = {
  display: "flex",
  flexWrap: "wrap",
  width: "270px",
};
export const footer = {
  position: "absolute",
  left: 0,
  bottom: 0,
  right: 0,
  top: `${vh}px`,
};
