﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;

namespace Ornament.Files.Excels
{
    public enum OfficeType
    {
        Office2003,
    }

    public abstract class ExcelFileImport
    {
        private readonly IRowProcess _process;
        private List<List<ValidationResult>> _rowsResult;

        protected ExcelFileImport(IRowProcess process)
        {
            _process = process;
        }

        public List<List<ValidationResult>> RowsResult
        {
            get { return _rowsResult ?? (_rowsResult = new List<List<ValidationResult>>()); }
        }

        public OfficeType OfficeType { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="excelFile"></param>
        /// <param name="sheetIndex">0 start</param>
        /// <param name="skipRow">0 start</param>
        public void Read(Stream excelFile, int sheetIndex, int skipRow)
        {
            using (excelFile)
            {
                var workbook = new HSSFWorkbook(excelFile, false);
                ISheet sheet = workbook.GetSheetAt(0);
                int start = sheet.FirstRowNum > skipRow ? sheet.FirstRowNum : skipRow;
                int end = sheet.LastRowNum;
                if (start >= end)
                {
                    return;
                }

                for (int i = start; i <= end; i++)
                {
                    IRow row = sheet.GetRow(i);

                    var array = new List<ICell>();
                    int cellsNumber = row.Cells.Count;
                    for (short cellIndex = row.FirstCellNum; cellIndex <= cellsNumber; cellIndex++)
                    {
                        array.Add(row.GetCell(cellIndex, MissingCellPolicy.CREATE_NULL_AS_BLANK));
                    }
                    List<ValidationResult> result;
                    _process.Process(array.ToArray(), out result);
                    RowsResult.Add(result);
                }
            }
        }
    }
}