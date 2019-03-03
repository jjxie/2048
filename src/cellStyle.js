// return cell className by cell value
export const cellClassName = value => {
  let className;
  switch (value.toString()) {
    case "2":
      className = "cell-2";
      break;
    case "4":
      className = "cell-4";
      break;
    case "8":
      className = "cell-8";
      break;
    case "16":
      className = "cell-16";
      break;
    case "32":
      className = "cell-32";
      break;
    case "64":
      className = "cell-64";
      break;
    case "128":
      className = "cell-128";
      break;
    case "256":
      className = "cell-256";
      break;
    case "512":
      className = "cell-512";
      break;
    case "1024":
      className = "cell-1024";
      break;
    case "2048":
      className = "cell-2048";
      break;
    default:
      className = "gridCell";
  }
  return className;
};
