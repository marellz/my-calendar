const list = []

list.reduce(function(total, curr) {
  (total[curr[key]] = total[curr[key]] || []).push(curr);
  return total;
}, {});
