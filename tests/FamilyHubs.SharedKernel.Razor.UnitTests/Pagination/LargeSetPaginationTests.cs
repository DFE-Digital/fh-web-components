﻿using FamilyHubs.SharedKernel.Razor.Pagination;
using FluentAssertions;

namespace FamilyHubs.SharedKernel.Razor.UnitTests.Pagination;

public class LargeSetPaginationTests
{
    [Theory, MemberData(nameof(Data))]
    public void Ctor_ItemsGeneratedCorrectly(int count, int current, IEnumerable<PaginationItem> expected)
    {
        var pagination = new LargeSetPagination(count, current);
        var actual = pagination.PaginationItems;

        //todo: test that ignores current, and separate test to check current
        actual.Should().BeEquivalentTo(expected);
    }

    public static IEnumerable<object[]> Data =>
        new List<object[]>
        {
            //todo: test to check don't show instead
            //new object[] {0, 1, GenerateExpected()},
            //new object[] {1, 1, GenerateExpected(1)},
            new object[] {2, 1, GenerateExpected(0, 1, 2)},
            new object[] {2, 2, GenerateExpected(1, 1, 2)},
            new object[] {3, 1, GenerateExpected(0, 1, 2, 3)},
            new object[] {3, 2, GenerateExpected(1, 1, 2, 3)},
            new object[] {3, 3, GenerateExpected(2, 1, 2, 3)},
            new object[] {4, 1, GenerateExpected(0, 1, 2, null, 4)},
            new object[] {7, 4, GenerateExpected(3, 1, null, 3, 4, 5, null, 7)},
            new object[] {42, 20, GenerateExpected(3, 1, null, 19, 20, 21, null, 42)}
        };

    public static PaginationItem[] GenerateExpected(int currentIndex, params int?[] pages)
    {
        return pages.Select((p, i) => p == null ? new PaginationItem() : new PaginationItem(p.Value, i == currentIndex)).ToArray();
    }
}