using AutoBogus;
using Cricut.Orders.Api.Mappings;
using Cricut.Orders.Api.ViewModels;
using FluentAssertions;

namespace Cricut.Orders.Tests.Cricut.Orders.Api.Mappings
{
    [TestClass]
    public class ToDomainModelMappingsTests
    {
        [TestMethod]
        public void NewOrderViewModel_ToDomain_MapsCorrectly()
        {
            var viewModel = new AutoFaker<NewOrderViewModel>()
                .Generate();

            var domainModel = viewModel.ToDomainModel();
            domainModel.Should().BeEquivalentTo(viewModel);
            domainModel.Id.Should().BeNull();
        }

        [TestMethod]
        public void NewOrderViewModel_ToDomain_TotalCalculatedCorrectly()
        {
            var viewModel = new NewOrderViewModel
            {
                Customer = new CustomerViewModel
                {
                    Id = 1,
                    Name = "John Doe",
                    Address = "123 Street",
                    Email = "john@cool.example.com",
                },
                OrderItems = new[]
                {
                    new OrderItemViewModel
                    {
                        Product = new ProductViewModel
                        {
                            Id = 1,
                            Name = "Product 1",
                            Price = 13.50,
                        },
                        Quantity = 1,
                    },
                    new OrderItemViewModel
                    {
                        Product = new ProductViewModel
                        {
                            Id = 2,
                            Name = "Product 2",
                            Price = 11.50,
                        },
                        Quantity = 1,
                    },
                },
            };

            var expectedTotal = 22.50d;

            var domainModel = viewModel.ToDomainModel();
            domainModel.Total.Should().Be(expectedTotal);
        }
    }
}
