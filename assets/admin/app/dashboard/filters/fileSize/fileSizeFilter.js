export default ()=>{
  return (input)=> {
    var out = "";
    var size = parseInt(input);
    if (isNaN(size)) return "0";
    var unit = ["o","Ko","Mo","Go","To"];
    var i = 0;
    while (size >= 1024) {
      i++;
      size = size/1024;
    }
    out = size.toFixed(2) + ' ' + unit[i];
    return out;
  }
}
