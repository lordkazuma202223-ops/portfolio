# Creative Portfolio

A modern, responsive personal portfolio website with bold aesthetics and smooth animations.

## Features

- **Hero Section** - Eye-catching introduction with gradient background
- **About Me** - Personal introduction with skills showcase
- **Projects Gallery** - Showcase of projects with hover effects
- **Contact Section** - Professional contact form and social links
- **Responsive Design** - Optimized for all screen sizes
- **Smooth Animations** - Engaging micro-interactions
- **Dark Theme** - Modern dark color scheme

## Tech Stack

- HTML5
- CSS3 (Custom styles, no frameworks)
- Google Fonts (Poppins)
- Font Awesome Icons

## Setup

1. Clone the repository:
```bash
git clone https://github.com/lordkazuma202223-ops/portfolio.git
```

2. Open `index.html` in your browser:
```bash
# Simply open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

## Customization

### Personal Information

Edit `index.html` to update:
- Name and title
- Bio/description
- Contact information
- Social media links

### Styling

Modify `styles.css` to customize:
- Colors (defined in `:root` variables)
- Fonts
- Animations
- Layout

### Projects

Add new projects in the Projects section of `index.html`:
```html
<div class="project-card">
    <div class="project-image"></div>
    <div class="project-content">
        <h3>Project Title</h3>
        <p>Project description</p>
        <div class="project-links">
            <a href="#" class="btn"><i class="fab fa-github"></i> Code</a>
            <a href="#" class="btn"><i class="fas fa-external-link-alt"></i> Demo</a>
        </div>
    </div>
</div>
```

## Deployment

### GitHub Pages

1. Enable GitHub Pages in repository settings
2. Select source as `main` or `master` branch
3. Your site will be live at `https://yourusername.github.io/portfolio`

### Netlify

1. Connect your GitHub repository
2. Deploy automatically on push

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the portfolio directory

## License

This project is open source and available for personal and commercial use.

## Credits

- Design inspired by modern portfolio trends
- Icons by Font Awesome
- Fonts by Google Fonts

---

**Built with ❤️ for showcasing creativity and skills**
