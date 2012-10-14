namespace QiProject.Defects
{
    public enum DefectStatus
    {
        /// <summary>
        /// Defect is closed.
        /// </summary>
        Closed,

        /// <summary>
        /// Defect is fixed
        /// </summary>
        Fixed,

        /// <summary>
        /// Defect is new 
        /// </summary>
        New,

        /// <summary>
        /// Renew defect which in NotDuplicate,Reject and Pending.
        /// </summary>
        Renew,

        /// <summary>
        /// Not duplicate.
        /// </summary>
        NotDuplicate,

        /// <summary>
        /// confirm it's a defect and need to fix.
        /// </summary>
        Open,

        /// <summary>
        /// Pending, fix it in next version.
        /// </summary>
        Pending,

        /// <summary>
        /// Reject defect, becuase it is not a defect,
        /// </summary>
        Rejected,

        /// <summary>
        /// Reopen the fixed defect.
        /// </summary>
        Reopen,
    }
}