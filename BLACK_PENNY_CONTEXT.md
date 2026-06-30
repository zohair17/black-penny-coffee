# Project
Black Penny Coffee Shop & Food

# Objective
Modern coffee shop website with premium and clean design.

# Brand
- Coffee Shop + Food
- Modern aesthetic
- Warm and inviting atmosphere

# Pages
Single Landing Page

# Completed Sections ✅

## Hero Section
- Completed
- Main headline added
- CTA added
- Hero image/video added

## Menu Section
- Completed
- Food items displayed
- Coffee items displayed
- Categories working

# Pending Sections ⏳

## About Section
- when scrolls down and move to the about section the video about.mp4 will be played in loop
- See the refrence Picture
- and when we come on about section the About Text will appear as a typewritter effect
- the heading "our story" will come on left with animation and use description lorem ipsum
- the heading "Our Value" will come on write with animations 
- Story of Black Penny
- Brand values
- Coffee quality focus

## Location Section
- Address
- Map
- Opening hours
- Contact information

## Footer
- Navigation links
- Social media links
- Copyright text

# Design Rules
- Premium feel
- Clean layout
- Strong typography
- Consistent spacing

# Current Status
Hero and Menu completed.
Working on About Section.

# Problem
- ⨯ Error: Image Optimization using the default loader is not compatible with `{ output: 'export' }`.
  Possible solutions:
    - Remove `{ output: 'export' }` and run "next start" to run server mode including the Image Optimization API.
    - Configure `{ images: { unoptimized: true } }` in `next.config.js` to disable the Image Optimization API.
  Read more: https://nextjs.org/docs/messages/export-image-api
    at ignore-listed frames {
  digest: '2768655431@E500'
}
 GET / 500 in 1785ms (next.js: 856ms, application-code: 929ms)
[browser] Uncaught Error: Image Optimization using the default loader is not compatible with `{ output: 'export' }`.
  Possible solutions:
    - Remove `{ output: 'export' }` and run "next start" to run server mode including the Image Optimization API.
    - Configure `{ images: { unoptimized: true } }` in `next.config.js` to disable the Image Optimization API.
  Read more: https://nextjs.org/docs/messages/export-image-api
    at Navbar (src/components/layout/Navbar.jsx:22:11)
    at AboutSection (src/components/about/AboutSection.jsx:58:11)
    at Home (src\app\page.js:10:7)
  20 |       <nav className="mx-auto flex max-w-7xl items-center justify-bet...
  21 |         <a href="#home" aria-label={siteConfig.name} className="shrin...
> 22 |           <Image
     |           ^
  23 |             src={assets.logo.src}
  24 |             alt={`${siteConfig.name} logo`}
  25 |             width={56}



# Updation:
1) make the whole app responsive for every small and medium screen and large screen.for every mobile , tablet and LCD make this website responsive 