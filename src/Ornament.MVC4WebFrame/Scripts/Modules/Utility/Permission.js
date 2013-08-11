function hasPermission(intTotal, intOperator) {
    if (typeof intOperator == 'string')
        intOperator = parseInt(intOperator);
    if (typeof intOperator == 'string')
        intTotal = parseInt(intTotal);
    return intOperator != 0 && intTotal >= intOperator && (intTotal & intOperator) == intOperator;
}