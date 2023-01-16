using System.Linq;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Tests_API
{
    public static class QueryableExtensions
    {
        public static DbSet<T> AsDbSet<T>(this IQueryable<T> queryable) where T : class
        {
            var dbSet = new Mock<DbSet<T>>();
            dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
            dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
            dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());
            return dbSet.Object;
        }
    }
}