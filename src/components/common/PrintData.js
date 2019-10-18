export function printCode(id) {
    let subOutputRankPrint = document.getElementById(id);
    let newContent = subOutputRankPrint.innerHTML;
    let oldContent = document.body.innerHTML;
    document.body.innerHTML = newContent;
    window.print();
    window.location.reload();
    document.body.innerHTML = oldContent;
    return false;
}
export default {
    printCode
}