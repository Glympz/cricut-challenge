using AutoBogus;
using Cricut.Orders.Api.ViewModels;
using FluentAssertions;
using System.Net.Http.Json;

namespace Cricut.Orders.Integration.Tests
{
    [TestClass]
    public class CustomerIntegrationTests
    {
        [DataTestMethod]
        [DataRow(12345, true)]
        [DataRow(54321, true)]
        [DataRow(77777, false)]
        public async Task GetOrders_By_CustomerID(int customerId, bool hasOrders)
        {
            var client = OrdersApiTestClientFactory.CreateTestClient();
            var request = new HttpRequestMessage(HttpMethod.Get, $"v1/customers/{customerId}/orders");
            var response = await client.SendAsync(request);

            response.IsSuccessStatusCode.Should().BeTrue();
            var orders = await response.Content.ReadFromJsonAsync<OrderViewModel[]>();
            (orders?.Length > 0).Should().Be(hasOrders);
        }
    }
}
