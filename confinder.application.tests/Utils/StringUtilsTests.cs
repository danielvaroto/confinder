using System;
using System.Globalization;
using confinder.application.Utils;

namespace confinder.application.tests.Utils
{
    [TestClass]
    public class StringUtilsTests
    {
        [TestMethod]
        public void RemoveDiacritics()
        {
            var input = "áéíóúâêîôû";
            var output = StringUtils.Normalize(input);
            var expected = "aeiouaeiou";
            Assert.AreEqual(expected, output);
        }

        [TestMethod]
        public void RemoveSpaces()
        {
            var input = "a\n asdasd";
            var output = StringUtils.Normalize(input);
            var expected = "aasdasd";
            Assert.AreEqual(expected, output);
        }

        [TestMethod]
        public void LowerStrings()
        {
            var input = "AaBbCc";
            var output = StringUtils.Normalize(input);
            var expected = "aabbcc";
            Assert.AreEqual(expected, output);
        }

        [DataTestMethod]
        [DataRow(null, null)]
        [DataRow("16/05/2022", null)]
        [DataRow("05/04/2022", "2022-05-04")]
        [DataRow("1 August 2022", "2022-08-01")]
        [DataRow("Monday, 11 July 2022", "2022-07-11")]
        [DataRow("9/25/2022", "2022-09-25")]
        [DataRow("12/9/2022", "2022-12-09")]
        [DataRow("September 7, 2022", "2022-09-07")]
        [DataRow("Monday, September 19, 2022", "2022-09-19")]
        [DataRow("2022-06-18", "2022-06-18")]
        [DataRow("2022 August 20", "2022-08-20")]
        [DataRow("May 12, 2022", "2022-05-12")]
        public void ParseDate(string input, string expected)
        {
            Assert.AreEqual(expected, StringUtils.ParseDate(input)?.ToString("yyyy-MM-dd"));
        }
    }
}

