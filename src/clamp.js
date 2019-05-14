function clamp(num, minNum, maxNum){
    return Math.min(
        Math.max(minNum, num),
        maxNum
    )
}