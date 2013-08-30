$.fn.inputlimiter.defaults = {
    limit: 255,
    boxAttach: true,
    boxId: 'limiterBox',
    boxClass: 'limiterBox',
    remText: '%n character%s 剩下.',
    remTextFilter: $.fn.inputlimiter.remtextfilter,
    remTextHideOnBlur: true,
    remFullText: null,
    limitTextShow: true,
    limitText: '最多输入  %n character%s.',
    limitTextFilter: $.fn.inputlimiter.limittextfilter,
    zeroPlural: true,
    allowExceed: false,
    useMaxlength: true,
    limitBy: 'characters',
    lineReturnCount: 1
};