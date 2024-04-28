using System;
using System.Globalization;
using System.Text;

namespace confinder.application.Utils
{
    public static class StringUtils
    {
        public static string Normalize(string? text)
        {
            if (text == null) return String.Empty;

            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder(capacity: normalizedString.Length);

            for (int i = 0; i < normalizedString.Length; i++)
            {
                var c = char.ToLowerInvariant(normalizedString[i]);
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (
                    unicodeCategory != UnicodeCategory.NonSpacingMark
                    && unicodeCategory != UnicodeCategory.SpaceSeparator
                    && unicodeCategory != UnicodeCategory.Control
                )
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder
                .ToString()
                .Normalize(NormalizationForm.FormC);
        }

        public static DateOnly? ParseDate(string? date)
        {
            if (DateOnly.TryParse(date?.Trim(), CultureInfo.InvariantCulture, out DateOnly parsedDate))
            {
                return parsedDate;
            }

            return null;
        }
    }
}

