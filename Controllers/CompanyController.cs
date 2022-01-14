using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreAngularTraining.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreAngularTraining.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
       private readonly DatabaseContext _context;

        public CompanyController(DatabaseContext context)
        {
            _context = context;
        }




        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> Get(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            return Ok(company);
        }

        [HttpGet("{id}/notices")]
        public async Task<ActionResult<Company>> Get(int id, string action)
        {
            var result = await _context.Notices
                                       .Where(n => n.NoticeCompanyKey == id)
                                       .OrderBy(n => n.NoticeFromDate )
                                       .ToListAsync();
            return Ok(result);
        }

    }
}
