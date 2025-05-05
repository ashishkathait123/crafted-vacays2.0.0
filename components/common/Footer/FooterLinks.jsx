export default function FooterLinks() {
    const links = [
      {
        title: 'Destinations',
        items: [
          { label: 'India', href: '/destinations/india' },
          { label: 'Kashmir', href: '/destinations/kashmir' },
          { label: 'Andamans', href: '/destinations/andamans' },
          { label: 'Neighboring', href: '/destinations/neighboring' },
          { label: 'Abroad', href: '/destinations/abroad' }
        ]
      },
      {
        title: 'Company',
        items: [
          { label: 'About Us', href: '/about' },
          { label: 'Contact Us', href: '/contact' },
          { label: 'Careers', href: '/careers' },
          { label: 'Blog', href: '/blog' }
        ]
      }
    ];
  
    return (
      <>
        {links.map((section) => (
          <div key={section.title} className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </>
    );
  }