using System;
using confinder.application.Utils;

namespace confinder.application.tests.Utils
{
    [TestClass]
    public class ConferenceUtilsTests
	{
        [TestMethod]
        public void RemoveDiacritics()
        {
            var input = "Virtual Conference";
            var output = ConferenceUtils.IsValidLocation(input);
            Assert.IsFalse(output);
        }
    }
}

