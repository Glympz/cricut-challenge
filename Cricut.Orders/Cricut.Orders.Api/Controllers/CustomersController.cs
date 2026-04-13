using Cricut.Orders.Api.Mappings;
using Cricut.Orders.Api.ViewModels;
using Cricut.Orders.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Cricut.Orders.Api.Controllers
{
    [Route("v1/customers")]
    [ApiController]
    public class CustomersController : Controller
    {
        private readonly IOrderDomain _orderDomain;

        public CustomersController(IOrderDomain orderDomain)
        {
            _orderDomain = orderDomain;
        }

        [HttpGet("{customerId}/orders")]
        public async Task<ActionResult<OrderViewModel[]>> GetCustomerOrders([FromRoute] int customerId)
        {
            var customerOrders = (await _orderDomain.GetOrdersByCustomerIdAsync(customerId))
                .Select(order => order.ToViewModel())
                .ToArray();

            return Ok(customerOrders);
        }
    }
}
