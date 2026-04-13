using AutoBogus;
using Cricut.Orders.Api.Mappings;
using Cricut.Orders.Api.ViewModels;
using Cricut.Orders.Domain.Models;
using FluentAssertions;

namespace Cricut.Orders.Tests.Cricut.Orders.Api.Mappings
{
    [TestClass]
    public class ToViewModelMappingsTests
    {
        [TestMethod]
        public void Order_ToViewModel_MapsCorrectly()
        {
            var domainModel = new AutoFaker<Order>()
                .Generate();

            var viewModel = domainModel.ToViewModel();
            viewModel.Should().BeEquivalentTo(domainModel, opts =>
                opts.Excluding(x => x.OrderItems));

            viewModel.OrderItems.Length.Should().Be(domainModel.OrderItems.Length);
            for (var i = 0; i < viewModel.OrderItems.Length; i++)
            {
                viewModel.OrderItems[i].Should().BeEquivalentTo(domainModel.OrderItems[i], opts =>
                    opts.Excluding(x => x.Total));
            }
        }

        [TestMethod]
        public void NewOrderViewModel_ToViewModel_TotalCalculatedCorrectly()
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
            var regeneratedViewModel = domainModel.ToViewModel();

            domainModel.Total.Should().Be(expectedTotal);
            regeneratedViewModel.Total.Should().Be(expectedTotal);
        }

    }
}
