import type { ArticleBody } from "@/content/types";

/*
 * The articles themselves, keyed by the slug in `blog.ts`.
 *
 * Every one is written from its own cover. The pictures already state the steps,
 * the mistakes and the formats, so taking the outline from the artwork is what
 * stops the words and the picture drifting apart. Nothing here names a client,
 * quotes a person or states a figure.
 *
 * Separate from `blog.ts` so the index stays readable, and shaped so that when a
 * CMS arrives this file becomes a fetch and nothing above it changes.
 */
export const ARTICLE_BODIES: Readonly<Record<string, ArticleBody>> = {
  /*
   * Carried over from the live kalaa.io. The wording is the client's, and four
   * things changed, each for a reason:
   *
   * - Em dashes and curly quotes are plain punctuation, which this site requires.
   * - The H2 that repeated the title word for word is gone and its paragraph is
   *   the intro. Two identical headings is one H1 wasted.
   * - ONE SENTENCE IS HELD BACK: "studies have shown that visually appealing
   *   content can increase social media engagement by up to 25%". It cites no
   *   study, and this project does not print a number it cannot stand behind.
   *   It goes back the day somebody supplies the source.
   * - Three internal links, added without changing a word around them.
   *
   * "Aesthetic Design in Different Industries", the style guide, the refresh
   * steps, the mistakes, the measuring section and the questions at the foot are
   * OURS, added at the client's say-so where the piece was thin: written for the
   * sectors Kalaa names, and for answer engines. Nothing in them claims a client,
   * a figure or a result.
   */
  "how-aesthetic-design-can-transform-your-brand": {
    intro: [
      "In today's competitive market, branding is more than just a logo or tagline. It's about creating a visual identity that resonates with your audience emotionally. Aesthetic design, especially the use of natural light, minimalist elements, and lifestyle settings, has become a powerful tool to elevate your brand's image and connect with consumers on a deeper level.",
    ],
    sections: [
      {
        id: "the-power-of-aesthetic-design",
        heading: "Introduction: The Power of Aesthetic Design",
        body: [
          "Aesthetic design isn't just about making things look beautiful; it's about creating an experience. By incorporating soft lighting, natural textures, and a clean design approach, brands can create a memorable and emotional connection with their audience. This blog explores how aesthetic design can enhance your brand's visual identity, boost engagement, and ultimately contribute to your brand's success.",
        ],
      },
      {
        id: "what-is-aesthetic-design",
        heading: "What is Aesthetic Design?",
        body: [
          "Aesthetic design focuses on creating visuals that are pleasing to the eye and convey a sense of harmony. It combines elements such as color schemes, lighting, layout, and textures to create a cohesive and visually appealing brand image. Here's how you can leverage aesthetic design to create a positive impact for your brand:",
        ],
        list: [
          "**Color Schemes**: Using colors that resonate with your target audience can evoke emotions and influence behavior. For example, soft, pastel tones create calmness, while bold colors like red or blue can convey energy and power.",
          "**Lighting**: Natural light, especially golden hour light, adds warmth and sophistication to your imagery. It can create a serene atmosphere and make products look more appealing.",
          "**Textures & Materials**: Incorporating natural textures such as wood, stone, or soft fabrics can add depth to your design and make your visuals feel more tactile and inviting.",
          "**Minimalism**: Less is often more. Using simple, clean designs ensures your brand message is clear and doesn't overwhelm your audience.",
        ],
      },
      {
        id: "how-aesthetic-design-enhances-your-brand",
        heading: "How Aesthetic Design Enhances Your Brand",
        body: [],
        subsections: [
          {
            id: "building-emotional-connections",
            heading: "Building Emotional Connections",
            body: [
              "Aesthetic design isn't just about looking good; it's about **connecting with your audience emotionally**. By using soft light, serene compositions, and aspirational scenes, you can evoke feelings of calm, luxury, and comfort, making your audience feel more connected to your brand.",
              "For example, imagine your product showcased in a cozy home setting with soft, golden morning light streaming through sheer curtains. This kind of image can make your audience feel warm and at ease, strengthening their bond with your brand.",
            ],
          },
          {
            id: "creating-a-consistent-brand-identity",
            heading: "Creating a Consistent Brand Identity",
            body: [
              "Consistency in design is key to building a strong brand identity. Whether it's your website, social media, or packaging, aesthetic design ensures that your visuals remain cohesive across all platforms. This consistency helps your audience recognize and trust your brand, which is crucial for long-term success.",
              "By sticking to a well-defined aesthetic (e.g., soft natural lighting and minimalist setups), your brand will appear polished and professional, helping to differentiate it from the competition.",
            ],
          },
          {
            id: "increasing-engagement-and-attention",
            heading: "Increasing Engagement and Attention",
            body: [
              "Aesthetically pleasing visuals naturally attract attention. When people see high-quality images that are well-lit, thoughtfully composed, and emotionally engaging, they're more likely to pause, admire, and interact with your content. This can translate into higher engagement rates on social media and more clicks on your website.",
              "Whether it's a beautifully styled product shot or a serene lifestyle scene, aesthetics matter.",
            ],
          },
        ],
      },
      {
        id: "the-role-of-lighting",
        heading: "The Role of Lighting in Aesthetic Design",
        body: [
          "One of the most impactful aspects of aesthetic design is **lighting**. The right lighting can dramatically change how a product or scene is perceived. Let's break down how lighting influences aesthetic design:",
        ],
        subsections: [
          {
            id: "golden-hour-light",
            heading: "Golden Hour Light",
            body: [
              "Golden hour light, the soft and warm light that occurs shortly after sunrise or before sunset, adds a **natural glow** to your photos. It creates a sense of **luxury and warmth**, making your products look more inviting and premium. Using golden hour light can help convey feelings of aspiration and calm.",
            ],
          },
          {
            id: "soft-natural-lighting",
            heading: "Soft, Natural Lighting for a Warm Ambiance",
            body: [
              "Soft, diffused light creates a more intimate and relaxed atmosphere. When photographing products or lifestyle scenes, you can use sheer curtains or natural light sources to **soften the image** and create a peaceful vibe. This kind of lighting is perfect for brands that focus on wellness, luxury, or home decor.",
            ],
          },
          {
            id: "consistency-across-platforms",
            heading: "Consistency Across Platforms",
            body: [
              "Once you define the ideal lighting style for your brand, consistency is crucial. Use this lighting style across all your marketing materials, from product shots to website images, to create a seamless brand experience for your audience.",
            ],
          },
        ],
      },
      {
        id: "how-to-implement-aesthetic-design",
        heading: "How to Implement Aesthetic Design for Your Brand",
        body: ["If you're looking to transform your brand using aesthetic design, here are a few tips:"],
        list: [
          "**Define Your Brand's Visual Identity**: Choose a color palette, lighting style, and design elements that align with your brand's values and mission. Whether you want to convey luxury, simplicity, or comfort, your design should reflect these ideals.",
          "**Incorporate Lifestyle Imagery**: Show your products in real-life settings. Lifestyle imagery, where your products are used or showcased in relatable environments, helps your audience imagine themselves using your product.",
          "**Focus on Quality**: Invest in high-quality photography. The quality of your visuals speaks volumes about your brand. Ensure your images are clear, crisp, and professionally shot.",
          "**Be Consistent**: Maintain a consistent style across all your marketing channels. Consistency is key to building a strong, recognizable brand.",
        ],
      },
      {
        id: "building-a-simple-brand-style-guide",
        heading: "Building a Simple Brand Style Guide",
        body: [
          "Consistency is easier to keep when the choices are written down. A style guide does not need to be long: one page that anyone who makes a post can follow is enough.",
        ],
        table: {
          caption: "What a one-page brand style guide covers",
          head: ["Part of the guide", "What to decide", "An example"],
          rows: [
            ["Colours", "A main colour, one or two supporting colours, and a neutral", "Deep green, warm sand, and an off-white background"],
            ["Type", "One typeface for headings and one for text", "A bold sans serif for headings, a plain one for captions"],
            ["Photography", "The light, the setting and the angle you shoot in", "Soft daylight, real rooms, shot at eye level"],
            ["Editing", "One edit applied to every image", "Warm and slightly muted, never oversaturated"],
            ["Layout", "Where text and the logo sit on a post", "Text in the top third, the logo small in one corner"],
            ["Words", "How the brand sounds", "Plain, warm and specific, with no jargon"],
          ],
        },
        after: [
          "Keep the guide where everyone who posts can find it, and check new work against it before it goes out. Setting this up is part of our [brand strategy and design](/services#brand-strategy-and-design) service.",
        ],
      },
      {
        id: "refreshing-your-brands-look-step-by-step",
        heading: "Refreshing Your Brand's Look, Step by Step",
        body: [
          "If your current visuals feel inconsistent, a refresh is usually a matter of deciding and applying, not starting again. These steps take a brand from mixed to consistent without losing what people already recognise.",
        ],
        flow: {
          caption: "From a mixed look to a consistent one",
          steps: [
            { title: "Audit what you have", text: "Lay out your recent posts, website images and packaging side by side, and note what feels like you and what does not." },
            { title: "Choose a direction", text: "Collect images, colours and textures that suit the brand into one moodboard." },
            { title: "Write the rules", text: "Turn the moodboard into a one-page style guide covering colour, type, light and editing." },
            { title: "Reshoot the key images", text: "Start with the pictures people see most: your profile, your best products and the first screen of your website." },
            { title: "Roll it out together", text: "Change the profile, the website and new posts at the same time, so the old and new looks are not mixed for long." },
            { title: "Review after a month", text: "Check the saves, enquiries and comments on the new work, and adjust the rules that are not working." },
          ],
        },
      },
      {
        id: "aesthetic-design-in-different-industries",
        heading: "Aesthetic Design in Different Industries",
        body: [
          "The principles stay the same, but they show up differently depending on what you sell. Here is how they look in the industries Kalaa works with. If you would rather hand the shooting and editing to someone else, that is what our [content creation](/services#content-creation) service is for.",
        ],
        subsections: [
          {
            id: "interior-design-and-architecture",
            heading: "Interior Design and Architecture",
            body: [
              "Your work is already visual, so the risk is inconsistency rather than a shortage of material. Photograph finished spaces in the same light and at the same time of day, keep one colour grade across every post, and let the room fill the frame instead of text laid over it. A feed that looks like one portfolio reads as one practice.",
            ],
          },
          {
            id: "restaurants-and-food-brands",
            heading: "Restaurants and Food Brands",
            body: [
              "Food is judged in the first second, and light decides most of that. Shoot near a window rather than under overhead bulbs, keep the same plates, surfaces and angle across a menu, and show a dish being served as well as sitting still. Consistency is what makes a menu look like a kitchen with standards.",
            ],
          },
          {
            id: "manufacturing-industry-and-export",
            heading: "Manufacturing, Industry and Export",
            body: [
              "A clean, well-lit product shot does the same job for machinery that it does for a cup of coffee: it tells a buyer the business is careful. Use one neutral background, the same lighting setup for every product, and close-ups of the finish. For a buyer comparing suppliers they have never met, the photographs are the first evidence of how the work is done.",
            ],
          },
        ],
      },
      {
        id: "common-aesthetic-mistakes",
        heading: "Common Aesthetic Mistakes",
        body: [
          "Most visual problems come from inconsistency rather than a lack of talent. These are the ones to watch for, and each has a straightforward fix.",
        ],
        table: {
          caption: "Aesthetic mistakes, why they hurt, and how to fix them",
          head: ["Mistake", "Why it hurts", "The fix"],
          rows: [
            ["Following every visual trend", "The feed looks different every month, so nothing becomes recognisable", "Take from a trend only what fits your style guide"],
            ["Too many colours and fonts", "Posts look like they come from different businesses", "Keep to the colours and type in the guide"],
            ["Heavy filters on products", "Colours on screen stop matching what the customer receives", "Keep product colours true, and apply the edit lightly"],
            ["Mixed lighting from post to post", "The feed looks patchy even when each photo is good", "Shoot in the same light, at the same time of day where you can"],
            ["Cluttered backgrounds", "The product has to compete for attention", "One plain surface or setting, used again and again"],
            ["Stock photos that do not match reality", "Customers notice the gap when the real thing arrives", "Use your own photos of your own products and spaces"],
          ],
        },
      },
      {
        id: "measuring-whether-the-new-look-is-working",
        heading: "Measuring Whether the New Look Is Working",
        body: [
          "A new look should change how people respond, not only how the feed looks. Compare the posts made in the new style against the ones made before it.",
        ],
        table: {
          caption: "Signals that show whether aesthetic changes are paying off",
          head: ["Signal", "What to compare", "Where to find it"],
          rows: [
            ["Saves and shares", "Posts in the new style against earlier posts", "Post insights on Instagram and Facebook"],
            ["Profile visits that turn into follows", "The weeks before and after the change", "Profile insights"],
            ["Enquiries that mention the look", "Whether people comment on the style or the photos", "Messages and comments"],
            ["Time spent on your website", "Pages with the new images against the old ones", "Your website analytics"],
          ],
        },
        after: [
          "Give the new look a full month before judging it. A single post that does well or badly says little; a month of posts shows a pattern.",
        ],
      },
      {
        id: "key-takeaways",
        heading: "Key Takeaways",
        body: [],
        list: [
          "**Aesthetic design** isn't just about beauty; it's about creating an emotional connection with your audience.",
          "**Lighting** plays a pivotal role in elevating your brand's visuals and conveying the right message.",
          "Consistency in your **aesthetic style** helps establish a professional, cohesive brand identity.",
          "**High-quality, lifestyle images** are more likely to attract engagement and convert followers into customers.",
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        body: [
          "Aesthetic design is a powerful tool that can elevate your brand and create lasting impressions. By using soft lighting, minimalistic design elements, and consistent visuals, you can build a brand identity that resonates emotionally with your audience. If you want to bring these aesthetic principles into your [branding](/services#brand-strategy-and-design) and elevate your visuals, Kalaa is here to help you create beautiful, engaging content.",
        ],
        subsections: [
          {
            id: "ready-to-transform-your-brand",
            heading: "Ready to transform your brand with stunning visuals?",
            body: [
              "[Contact Kalaa](/contact) today for a free consultation and start creating an aesthetic design that captures your brand's essence.",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        question: "What is aesthetic design in branding?",
        answer:
          "Aesthetic design in branding is the deliberate choice of colour, lighting, texture and layout so that everything a brand shows looks like it belongs together. The aim is a look people recognise before they read the name.",
      },
      {
        question: "Does aesthetic design matter for a small business?",
        answer:
          "Yes. A small business often has one chance to look credible to someone who has never heard of it, and consistent, well-lit visuals are one of the least expensive ways to earn that. It does not need a large budget, only the same choices made every time.",
      },
      {
        question: "How do I keep my brand looking consistent on social media?",
        answer:
          "Write down your colours, your lighting style and the kinds of shots you use, then check every post against that list before it goes out. Most inconsistency comes from making those choices again for each post.",
      },
      {
        question: "Do I need professional photography for an aesthetic brand?",
        answer:
          "Not for everything. Natural light, a clean background and a steady hand get a phone most of the way for social posts. Professional photography earns its cost on the images that carry the most weight, such as your website, your key products and your advertising.",
      },
      {
        question: "How many colours should a brand use?",
        answer:
          "Fewer than most businesses think. A main colour, one or two supporting colours and a neutral background cover almost everything, and a small palette is much easier to keep consistent than a large one.",
      },
      {
        question: "How often should a brand refresh its look?",
        answer:
          "Only when the business changes, such as a new offer, a new audience or a move upmarket. Small adjustments along the way are healthy, but a full redesign every year throws away the recognition the old look had built.",
      },
    ],
  },
  /*
   * The long version, rewritten on 2026-09-11 to the depth of a reference piece
   * the client supplied. The outline is still the four steps printed on its
   * cover, in the cover's order, so the words and the picture agree.
   *
   * Every table and the diagram are method, not data: nothing here is a
   * statistic, and the worked example is an illustration, labelled as one.
   */
  "how-to-plan-your-social-media-strategy": {
    intro: [
      "A social media strategy is a short written plan that says what your accounts are for, who they are for, what you will post, and how you will know it worked. It is what turns posting from a daily chore into work you can judge.",
      "Most social media plans come apart early, because they start with what to post rather than what the posting is for. The fix is to work through four steps in order: set clear goals, know your audience, plan the content, then measure and keep improving. Skip one and the next has nothing to stand on.",
    ],
    sections: [
      {
        id: "what-a-social-media-strategy-is",
        heading: "What a social media strategy is",
        body: [
          "People use three words for three different things, and mixing them up is where a lot of wasted effort starts. The strategy is the reasoning. The content calendar is the schedule that carries it out. The posts are the individual pieces.",
        ],
        table: {
          caption: "Strategy, calendar and posts compared",
          head: ["Term", "What it answers", "How often it changes"],
          rows: [
            ["Social media strategy", "Why you post, for whom, and what counts as success", "Every three to six months, or when the business changes"],
            ["Content calendar", "What goes out, on which day, on which platform", "Every month"],
            ["A post or reel", "One idea, for one audience, doing one job", "Every day or week"],
          ],
        },
        after: [
          "If you only have a calendar, you have a schedule with no way to tell whether it is working. The steps below produce the strategy the calendar should be built on.",
        ],
      },
      {
        id: "why-the-order-matters",
        heading: "Why the order matters",
        body: [
          "Each step uses what the step before it decided. A goal tells you which audience matters. The audience tells you what to say. The content gives you something to measure, and the measurement tells you whether to keep the goal or change it.",
        ],
        flow: {
          caption: "Each step feeds the next",
          steps: [
            { title: "Set clear goals", text: "Decide what the accounts are for, in a form you can check at the end of the month." },
            { title: "Know your audience", text: "Write down who you are talking to, what they compare you against, and what makes them hesitate." },
            { title: "Plan the content", text: "Choose a few content pillars and a posting rhythm you can keep for months." },
            { title: "Measure and keep improving", text: "Read the results against the goal, change one thing, and run the next month." },
          ],
          loop: "What you learn in the last step becomes the input to the first one next quarter.",
        },
      },
      {
        id: "start-with-an-audit",
        heading: "Start with an audit of what you already have",
        body: [
          "Before you set a goal, spend an hour on what your accounts are doing today. A strategy written without looking at the current accounts usually repeats the problems it was meant to fix.",
          "Look at the last thirty posts rather than the last three. A few recent posts show you a mood; thirty show you a pattern.",
        ],
        table: {
          caption: "What to check in an audit, and what each check tells you",
          head: ["What to check", "How to check it", "What it tells you"],
          rows: [
            ["Profile basics", "Read your bio, highlights, contact button and link as a stranger would", "Whether a new visitor can tell what you do and how to reach you"],
            ["What you post", "Sort the last thirty posts into types: product, offer, behind the scenes, tips", "Which kinds of post you lean on, and which you have stopped making"],
            ["What worked", "Note which posts brought messages, saves or shares, not only likes", "Which content moves people towards getting in touch"],
            ["Who follows you", "Check the audience breakdown in insights: cities, age range and active times", "Whether the people you reach are the people who buy"],
            ["How you reply", "Look at how quickly and how fully comments and messages were answered", "Whether interest is being lost after it arrives"],
          ],
        },
        after: [
          "Write the findings down in a few lines. They become the starting point for every step that follows, and the baseline you will compare against in three months.",
        ],
      },
      {
        id: "set-clear-goals",
        heading: "Set clear goals",
        body: [
          "A goal has to be something you can check later. More enquiries this quarter is a goal. Growing the brand is not, because nobody can tell you at the end of the month whether it happened.",
          "Pick one goal at a time and let it decide everything else. Reach, enquiries and sales want different content, and a page trying to do all three at once usually does none of them well.",
        ],
        table: {
          caption: "Common goals and how to measure them",
          head: ["Goal", "What to measure", "Where to find it"],
          rows: [
            ["More enquiries", "Messages, calls and form fills that started on social media", "Instagram and Facebook insights, and a label on each WhatsApp Business chat"],
            ["Reach new people", "Accounts reached who do not already follow you", "The reach breakdown in each platform's insights"],
            ["Sales", "Link clicks, product taps and orders from social media", "Your shop's analytics, and Meta Commerce Manager"],
            ["Trust with local customers", "Saves, shares and profile visits", "Post and profile insights"],
          ],
        },
        subsections: [
          {
            id: "what-makes-a-goal-usable",
            heading: "What makes a goal usable",
            body: ["Check the goal against these before you move on. If it fails one, rewrite it."],
            list: [
              "**It names one outcome.** Enquiries, reach or sales, not all three at once.",
              "**It has a time limit.** A quarter is long enough to see a pattern and short enough to act on.",
              "**Someone owns it.** One person reads the numbers and makes the call.",
              "**You can see it in a report.** If no insights screen shows it, you cannot track it.",
            ],
          },
        ],
      },
      {
        id: "know-your-audience",
        heading: "Know your audience",
        body: [
          "Write down who you are talking to before you write anything for them. What they already do, what they are choosing between, and what would make them hesitate.",
          "A lot of what gets called a content problem is an audience problem. The post was fine. It was written for somebody who was never going to buy.",
        ],
        list: [
          "What they already know about your category",
          "Who else they are comparing you against",
          "What they need to see before they trust you",
        ],
        subsections: [
          {
            id: "an-audience-sheet-you-can-fill-in",
            heading: "An audience sheet you can fill in",
            body: [
              "Answer these in plain sentences. The example column shows what the answers look like for an interior design studio. It is an illustration of the method, not a real client.",
            ],
            table: {
              caption: "Audience questions, with an example for an interior design studio",
              head: ["Question", "Example answer", "Why it matters"],
              rows: [
                ["Who decides to buy?", "Homeowners furnishing a new flat or a second home", "Tells you whose problems to write about"],
                ["What are they comparing you against?", "Buying furniture directly, or a contractor who also does interiors", "Tells you what you have to prove"],
                ["What makes them hesitate?", "The cost, and not knowing what the finished room will look like", "Tells you which worries the content has to answer"],
                ["Where do they look before deciding?", "Saved Instagram posts, Pinterest boards and finished projects", "Tells you which platform to lead with"],
                ["What would make them message today?", "Seeing a finished room close to their own size and budget", "Tells you what the call to action should offer"],
              ],
            },
          },
          {
            id: "choose-your-platforms",
            heading: "Choose the platforms that match the audience",
            body: [
              "Pick platforms from the audience sheet, not from habit. Start with the one where your customers already look before they decide, and add a second only when the first runs steadily.",
            ],
            table: {
              caption: "What each platform is best at for a business",
              head: ["Platform", "Best at", "Formats that suit it"],
              rows: [
                ["Instagram", "Visual products and local services that people browse and save before they get in touch", "Reels, carousels and stories"],
                ["Facebook", "Local groups, events and reviews, and people who use Instagram less", "Posts, events and groups"],
                ["LinkedIn", "Selling to other businesses, where the buyer is a manager or an owner", "Text posts, documents and short video"],
                ["YouTube", "Longer explanations and demonstrations that people search for", "Long videos and Shorts"],
                ["WhatsApp Business", "The conversation after someone is interested", "Catalogue, quick replies and broadcast lists to people who opted in"],
              ],
            },
            after: [
              "For many local businesses the working pair is Instagram to be found and WhatsApp to close the conversation. A manufacturer or exporter selling to other businesses usually does better leading with LinkedIn.",
            ],
          },
        ],
      },
      {
        id: "plan-the-content",
        heading: "Plan the content",
        body: [
          "Choose a small set of content pillars and a posting rhythm you can keep. Three pillars posted steadily will beat ten pillars posted in bursts.",
          "Plan a month at a time. It is the shortest window that shows you repetition and the longest one you can hold in your head.",
        ],
        subsections: [
          {
            id: "choose-your-content-pillars",
            heading: "Choose your content pillars",
            body: [
              "A pillar is a type of post you come back to again and again. Most businesses need three or four, and each one should do a different job.",
            ],
            table: {
              caption: "Content pillars and the job each one does, with a restaurant as the example",
              head: ["Pillar", "Its job", "Example for a restaurant"],
              rows: [
                ["Proof", "Shows the result people are paying for", "The signature dish, plated and shot near a window"],
                ["Teaching", "Answers a question before it is asked", "How a dish is made, or what to order on a first visit"],
                ["Behind the scenes", "Shows the people and the care", "The kitchen at the start of service"],
                ["Offers and news", "Gives a reason to act now", "A new menu, a festival special, or a table booking link"],
              ],
            },
          },
          {
            id: "pick-a-rhythm-you-can-keep",
            heading: "Pick a rhythm you can keep",
            body: [
              "How often you post matters less than whether you keep doing it. A page that posts on the same days every week trains people to expect it, and a page that posts in bursts teaches them nothing.",
              "Choose a rhythm you could still keep in your busiest month, then hold it for a full quarter before judging it. Keeping that rhythm going is what our [social media management](/services#social-media-management) service runs every month.",
            ],
          },
          {
            id: "plan-a-month-at-a-time",
            heading: "Plan a month at a time",
            body: [
              "Turn the pillars into a calendar a month ahead: the dates that matter, the posts for each week, and a few open slots for things that happen during the month. We break that working rhythm down in [a month of content, in five steps](/blog/a-month-of-content-in-five-steps).",
            ],
          },
          {
            id: "turn-one-idea-into-several-posts",
            heading: "Turn one idea into several posts",
            body: [
              "You do not need a new idea for every post. One good idea, shot or written once, can be cut into several pieces for different places, which keeps a steady rhythm without starting from nothing each day.",
            ],
            flow: {
              caption: "One idea, carried across a week",
              steps: [
                { title: "Capture the idea once", text: "Film or photograph one job, dish or product properly, with enough footage for more than one post." },
                { title: "Make the main piece", text: "Edit the strongest version into a reel or a carousel for the feed." },
                { title: "Cut the smaller pieces", text: "Pull a still for a post, a clip for stories, and a line of text for a status update." },
                { title: "Use it in conversation", text: "Keep the best image ready to send on WhatsApp when someone asks about that product or service." },
              ],
            },
          },
        ],
      },
      {
        id: "measure-and-improve",
        heading: "Measure and keep improving",
        body: [
          "Read the numbers against the goal you set in the first step, not against your last post. One reel doing well tells you very little. The same format doing well four times is a finding.",
          "Change one thing at a time. Change the hook, the format and the posting time together and the result teaches you nothing.",
        ],
        table: {
          caption: "What to read, and how often",
          head: ["When", "What to look at", "The decision it drives"],
          rows: [
            ["Every week", "Replies, messages and anything unusual", "Answer people, and note any question worth a post"],
            ["Every month", "The goal's own number, and which format did well more than once", "Keep the format that repeated, and drop one that did not"],
            ["Every quarter", "Progress against the goal you set at the start", "Keep the goal, raise it, or change it"],
          ],
        },
      },
      {
        id: "who-does-what",
        heading: "Decide who does what",
        body: [
          "A strategy fails quietly when nobody owns a part of it. In a small business one person often does several of these jobs, which is fine, as long as each job has a name next to it.",
        ],
        table: {
          caption: "The jobs in running a strategy, and how often each comes round",
          head: ["Job", "What it involves", "How often"],
          rows: [
            ["Planning", "Turning the strategy into next month's calendar", "Once a month"],
            ["Shooting and writing", "Capturing photos and video, and writing captions", "Every week"],
            ["Posting", "Publishing on the planned days, with the right tags and links", "On the planned days"],
            ["Replying", "Answering comments and messages, and passing enquiries on", "Every day"],
            ["Reviewing", "Reading the numbers against the goal and choosing one change", "Once a month"],
          ],
        },
        after: [
          "If you plan to put money behind posts, decide that here as well, because paid reach changes what the organic posts need to do. [What a small ad budget can actually do](/blog/what-a-small-ad-budget-can-actually-do) covers where a modest budget goes furthest.",
        ],
      },
      {
        id: "a-worked-example",
        heading: "A worked example: an interior design studio",
        body: [
          "Here is how the steps come together for a small interior design studio planning its next quarter. It shows the method, not a client's results.",
        ],
        table: {
          caption: "Each step, decided for an interior design studio",
          head: ["Step", "What the studio decides"],
          rows: [
            ["Goal", "More enquiries for full-home projects this quarter, counted from Instagram messages"],
            ["Audience", "Homeowners furnishing a new flat, who worry most about cost and the finished look"],
            ["Content", "Finished rooms, short before-and-after reels, and one tip a week on choosing materials"],
            ["Measure", "Messages each month, and which posts people saved before they got in touch"],
          ],
        },
        after: [
          "Every row points at the same outcome. That is the test of a strategy: each decision should make the goal more likely, and none should pull against it.",
        ],
      },
      {
        id: "a-second-example",
        heading: "A second example: a machinery exporter",
        body: [
          "The same steps give a very different plan for a business that sells machinery to other businesses. Again, this shows the method, not a client's results.",
        ],
        table: {
          caption: "Each step, decided for a machinery exporter",
          head: ["Step", "What the business decides"],
          rows: [
            ["Goal", "More qualified enquiries from overseas buyers this quarter, counted from LinkedIn messages and website forms"],
            ["Audience", "Purchase managers and plant owners comparing suppliers they have never met"],
            ["Content", "Machines running on the factory floor, close-ups of build quality, and answers to common specification questions"],
            ["Measure", "Enquiries each month, and which topics those enquiries asked about"],
          ],
        },
        after: [
          "Put the two examples side by side and the point of the order becomes clear: the goal and the audience decided everything, and the posts followed from them.",
        ],
      },
      {
        id: "mistakes-to-avoid",
        heading: "Mistakes to avoid while planning",
        body: [
          "Most planning problems come from skipping a step or doing two at once. The day-to-day habits that cost reach are covered in [common social media mistakes brands make](/blog/common-social-media-mistakes-brands-make).",
        ],
        list: [
          "**Starting with the calendar.** A calendar without a goal fills up with whatever is easiest to post.",
          "**Writing for everyone.** Content aimed at a general audience persuades nobody in particular.",
          "**Too many pillars.** With ten kinds of post, none is repeated often enough to work.",
          "**Judging too early.** One good or bad week tells you very little. Give a rhythm a full quarter.",
          "**Changing everything at once.** Change the hook, format and timing together and you cannot tell which change mattered.",
        ],
      },
      {
        id: "a-one-page-strategy-template",
        heading: "A one-page strategy template",
        body: [
          "Everything above fits on one page. Copy the left column into a document, fill in the middle, and keep it where everyone who posts can find it.",
        ],
        table: {
          caption: "A one-page social media strategy, section by section",
          head: ["Section", "What to write", "A good answer looks like"],
          rows: [
            ["Where we are now", "Three or four lines from the audit", "Plain findings, such as which posts brought messages"],
            ["The goal", "One outcome, a number and a date", "Something you can check at the end of the quarter"],
            ["The audience", "Who buys, what they compare, and what makes them hesitate", "The filled-in audience sheet"],
            ["Platforms", "The one to lead with, and the one to add later", "A reason for each, taken from the audience"],
            ["Content pillars", "Three or four types of post, with the job of each", "Pillars that each serve the goal"],
            ["Rhythm", "Which days you post, and on which platform", "A pace you could keep in your busiest month"],
            ["Owners", "A name next to each job", "Nobody left wondering whose turn it is"],
            ["Review", "When you read the numbers, and what you look at", "A monthly date in the calendar"],
          ],
        },
        after: [
          "Read it again before you plan each month. If a post in the calendar does not fit a line on this page, it probably does not belong in the calendar.",
        ],
      },
      {
        id: "quick-reference",
        heading: "Quick reference",
        body: [],
        table: {
          caption: "Every step at a glance",
          head: ["Step", "The question it answers", "What you should have at the end"],
          rows: [
            ["Start with an audit", "What are the accounts doing now?", "A few lines of findings to compare against later"],
            ["Set clear goals", "What are the accounts for?", "One goal, with a number and a date"],
            ["Know your audience", "Who are we talking to?", "A filled-in audience sheet"],
            ["Plan the content", "What will we post, and how often?", "A few pillars and a monthly calendar"],
            ["Measure and keep improving", "Is it working?", "A monthly review, and one change to test"],
          ],
        },
        after: [
          "If you would rather hand the whole plan to a team that runs it every month, [talk to Kalaa](/contact).",
        ],
      },
    ],
    faq: [
      {
        question: "How long should a social media strategy be?",
        answer:
          "One or two pages is enough for most businesses. It needs the goal, the audience, the content pillars, the posting rhythm and how you will measure it. Anything longer tends not to be read, and a strategy nobody reads does not guide anything.",
      },
      {
        question: "How often should I update my social media strategy?",
        answer:
          "Review it every quarter against the goal, and rewrite it when the business changes, for example a new service, a new city or a new kind of customer. The content calendar changes every month; the strategy should not.",
      },
      {
        question: "Which social media platforms should a small business use?",
        answer:
          "Start with the one where your customers already look before they buy, and do it well before adding a second. For many local businesses that is Instagram, with WhatsApp for the conversation that follows. A business that sells to other businesses often needs LinkedIn instead.",
      },
      {
        question: "Do I need a strategy if I only post on one platform?",
        answer:
          "Yes. The strategy is about what the posting is for and who it is for, and that question is the same on one platform or five. With a single account, a clear goal matters even more, because nothing else is carrying the load.",
      },
      {
        question: "What is the difference between a social media strategy and a content calendar?",
        answer:
          "The strategy explains why you post, for whom, and how you will judge success. The content calendar is the schedule that carries it out, day by day. A calendar without a strategy fills up with whatever is easiest to post.",
      },
      {
        question: "How long does a social media strategy take to show results?",
        answer:
          "Give a steady rhythm a full quarter before you judge it. A few weeks is too short to separate a real pattern from a lucky or unlucky post, and changing course every fortnight means nothing runs long enough to work.",
      },
      {
        question: "Should organic posts and paid ads be planned together?",
        answer:
          "Yes. They should serve the same goal and speak to the same audience. Organic posts build trust with people who already follow you, and ads carry your strongest posts to people who do not, so plan both from the same strategy.",
      },
    ],
  },

  /*
   * The long version, rewritten on 2026-09-11. The eight mistakes are the eight
   * crossed off on the cover's clipboard, in the cover's order, grouped by what
   * each one costs. No statistic anywhere: the tables are method.
   */
  "common-social-media-mistakes-brands-make": {
    intro: [
      "The most common social media mistakes brands make are posting without a strategy, posting inconsistently, only promoting, ignoring the people who reply, poor visuals, the wrong hashtags, never checking performance, and copying trends that do not fit. None of them is dramatic. They are small habits that quietly cost reach, and they are easy to keep because nothing obviously breaks.",
      "Each one is below, grouped by what it actually costs you, with the fix alongside. If you are making several, start at the top: the later fixes depend on the earlier ones.",
    ],
    sections: [
      {
        id: "the-mistakes-at-a-glance",
        heading: "The mistakes at a glance",
        body: [],
        table: {
          caption: "Each mistake, what it costs, and the fix",
          head: ["Mistake", "What it costs you", "The fix"],
          rows: [
            ["Posting without a strategy", "A page with no shape, so nobody learns what you do", "Write down one goal and one audience before the next post"],
            ["Inconsistent posting", "The page looks like the business has gone quiet", "A rhythm you can keep in your busiest month"],
            ["Only promotional content", "People stop looking before the offer worth seeing arrives", "Mix in posts that teach, show and prove"],
            ["Ignoring audience engagement", "Lost enquiries, and the cheapest research you will ever get", "Reply the same day, and turn good questions into posts"],
            ["Poor quality visuals", "The business is judged before a word is read", "Window light, a plain background and one consistent edit"],
            ["Not using the right hashtags", "Effort that brings nobody new", "A few specific tags that match what people search"],
            ["Not analysing performance", "Repeating what failed and dropping what worked", "A short monthly review against the goal"],
            ["Copying trends without relevance", "A week of posts that bring someone else's audience", "Join a trend only when it fits what you sell"],
          ],
        },
      },
      {
        id: "how-to-tell-which-mistakes-you-are-making",
        heading: "How to tell which mistakes you are making",
        body: [
          "Most businesses do not notice these mistakes directly. They notice a symptom, such as followers who never message, and then guess at the cause. Start from what you can see and work back to the mistake behind it.",
        ],
        table: {
          caption: "Symptoms you can see, and the mistake usually behind them",
          head: ["What you notice", "The mistake it usually points to", "Where to look first"],
          rows: [
            ["Followers, but hardly any messages", "Only promotional content, or posting without a strategy", "Whether the posts answer the questions buyers ask"],
            ["Reach falls after a quiet fortnight", "Inconsistent posting", "The dates of the last month's posts"],
            ["Plenty of likes, but no enquiries", "Posting without a strategy", "Whether each post points to one clear next step"],
            ["The same question keeps appearing in comments", "Ignoring audience engagement", "Your replies, and whether that question has its own post"],
            ["Profile visits that end without a follow or a message", "Poor quality visuals", "Your grid as a stranger sees it, small, on a phone"],
            ["Views from people nowhere near your area", "Not using the right hashtags", "The tags and the location on recent posts"],
            ["Nobody can say which post brought a customer", "Not analysing performance", "Whether new enquiries are asked how they found you"],
            ["A post did well but brought no one useful", "Copying trends without relevance", "Who engaged with it, and whether they could ever buy"],
          ],
        },
      },
      {
        id: "no-plan",
        heading: "Posting without a plan",
        body: ["The first two mistakes are really one: there is no plan behind the page, so what goes out depends on the day."],
        subsections: [
          {
            id: "posting-without-a-strategy",
            heading: "Posting without a strategy",
            body: [
              "Posting whatever is to hand on the day produces a page with no shape. A reader scrolling it learns nothing about what you do or who you are for.",
              "You are probably making this one if posts are chosen on the day, you cannot say which post brought an enquiry, or the feed could belong to any business in your category.",
              "The fix is small. Before the next post, write down one goal and one audience, and ask of every post whether it serves both. The whole process is in [how to plan your social media strategy](/blog/how-to-plan-your-social-media-strategy).",
            ],
          },
          {
            id: "inconsistent-posting",
            heading: "Inconsistent posting",
            body: [
              "Inconsistent posting does the same damage more slowly. A page that goes quiet for three weeks reads as a business that has gone quiet, and the people who did follow you get out of the habit of seeing you.",
              "Posting more is rarely the answer. Choose a rhythm you can keep in your busiest month, and build a small buffer of ready posts for the weeks when the business takes all your time.",
            ],
            table: {
              caption: "A buffer of ready posts, for the weeks the business takes over",
              head: ["What to keep ready", "How to prepare it", "When to use it"],
              rows: [
                ["Evergreen tips", "Answers to questions customers always ask, written in a quiet week", "Any week you cannot shoot anything new"],
                ["Finished work", "A folder of good photos of past jobs, products or dishes", "When the week's own work is not ready to show"],
                ["Behind the scenes", "Short clips filmed on an ordinary day", "When you need something personal without planning it"],
                ["Reposts", "Customer posts you have permission to share", "When the feed needs proof more than news"],
              ],
            },
            after: [
              "Top the buffer up whenever you have a slow day. A buffer that is used up and never refilled is only a delay.",
            ],
          },
        ],
      },
      {
        id: "all-selling",
        heading: "Making every post an advertisement",
        body: [
          "Only promotional content asks for something every time and offers nothing in between. People stop looking, and the page loses its audience by the day it finally has an offer worth seeing.",
        ],
        subsections: [
          {
            id: "only-promotional-content",
            heading: "Only promotional content",
            body: ["A healthy feed does several jobs, and selling is only one of them. The rest earn the attention that selling spends."],
            table: {
              caption: "A content mix that earns attention before it asks for it",
              head: ["Kind of post", "Its job", "Example"],
              rows: [
                ["Teaching", "Answers a question people already have", "How to choose the right size, or how to care for the product"],
                ["Proof", "Shows the result people are paying for", "A finished project, or a customer using the product"],
                ["Behind the scenes", "Shows the people and the care", "Packing an order, or the workshop at the start of the day"],
                ["Offer", "Gives a reason to act now", "A launch, a festival price, or limited stock"],
              ],
            },
            after: ["For more kinds of post that are not sales posts, see [Instagram content ideas](/blog/instagram-content-ideas-for-small-businesses)."],
          },
          {
            id: "ignoring-audience-engagement",
            heading: "Ignoring audience engagement",
            body: [
              "Ignoring the replies compounds it. Comments and messages are the cheapest signal you will ever get about what people want to know, and a question left unanswered in public is read by everyone who scrolls past it.",
            ],
            flow: {
              caption: "A reply routine that turns questions into content",
              steps: [
                { title: "Reply the same day", text: "Answer every comment and message while the person is still thinking about you." },
                { title: "Note the question", text: "Keep a running list of what people ask more than once." },
                { title: "Answer it in a post", text: "A question people keep asking is a post they have already asked for." },
                { title: "Point back to it", text: "The next time someone asks, send them the post." },
              ],
            },
          },
          {
            id: "replies-for-common-situations",
            heading: "Replies for the situations that come up most",
            body: [
              "A reply does not need to be long, but it needs to move the conversation on. These are patterns rather than scripts: put them in your own words.",
            ],
            table: {
              caption: "How to answer the messages and comments businesses get most",
              head: ["Situation", "What a good reply does", "What to avoid"],
              rows: [
                ["Someone asks the price in a comment", "Thanks them, gives a starting price or a range if you can, and invites a message for the details", "Replying only with a note to check your messages, which tells every other reader nothing"],
                ["Someone asks where you are or whether you deliver", "Answers in the comment, so the next reader has the answer too", "Leaving it for the private message alone"],
                ["A customer complains in public", "Acknowledges it in public, moves the detail to a private message, and follows up once it is sorted", "Arguing in the comments, or deleting the complaint"],
                ["Someone praises a post or a product", "Thanks them by name and, if they are a customer, asks whether you can share their words", "A reply so generic it could sit under any post"],
              ],
            },
          },
        ],
      },
      {
        id: "the-craft",
        heading: "Letting the craft slip",
        body: ["Craft is where a small business is judged before anyone reads a word, and it is also where the fixes cost least."],
        subsections: [
          {
            id: "poor-quality-visuals",
            heading: "Poor quality visuals",
            body: [
              "Poor visuals get judged before the words are read. A dark photograph or a cramped layout says something about the business whether or not it is true.",
              "None of the fixes need a studio:",
            ],
            list: [
              "**Light:** shoot near a window in daylight, and switch off overhead bulbs that tint everything yellow.",
              "**Background:** one plain surface or wall, used every time.",
              "**Steadiness:** rest the phone on something, or use a small tripod.",
              "**One edit:** pick one look and apply it to every photograph, so the feed reads as one business.",
            ],
            after: ["If you would rather hand this to someone, it is what our [content creation](/services#content-creation) service does."],
          },
          {
            id: "not-using-the-right-hashtags",
            heading: "Not using the right hashtags",
            body: [
              "Hashtags chosen without thought look like effort and do nothing, because they describe the post rather than the search somebody is making. A few specific tags that match what your customers would type do more than a long block of general ones.",
            ],
            table: {
              caption: "Kinds of hashtag, with a handmade jewellery business as the example",
              head: ["Kind", "What it is", "Example"],
              rows: [
                ["Too general", "So broad that the post disappears into it", "#fashion or #love"],
                ["Specific", "What a buyer would actually search for", "#handmadejewellery or #silverearrings"],
                ["Local", "Where you sell or deliver", "#yourcityjewellery"],
                ["Your own", "One tag for your brand, used every time", "#yourbrandname"],
              ],
            },
            after: [
              "Put the words people search for in the caption as well, not only in the tags. A caption that says plainly what the product is and where you are helps the post turn up when someone searches for it.",
            ],
          },
        ],
      },
      {
        id: "no-reading-back",
        heading: "Never reading anything back",
        body: ["The last two mistakes come from the same place: nobody is looking at what happened."],
        subsections: [
          {
            id: "not-analysing-performance",
            heading: "Not analysing performance",
            body: [
              "Not looking at performance means repeating the format that failed and dropping the one that worked, because neither was noticed. Looking at the same few numbers once a month is enough.",
            ],
            table: {
              caption: "What each signal tells you",
              head: ["Signal", "What it tells you", "What to do with it"],
              rows: [
                ["Saves", "People want to come back to it", "Make more posts like it"],
                ["Shares", "People think it is worth someone else's time", "Use the format again on a new topic"],
                ["Comments and messages", "It raised a question or a need", "Answer it, and turn repeated questions into posts"],
                ["Profile visits", "It made someone curious about you", "Check the bio and links are ready for them"],
                ["Reach beyond followers", "It travelled past your current audience", "Note the hook and timing, and test them again"],
              ],
            },
          },
          {
            id: "copying-trends-without-relevance",
            heading: "Copying trends without relevance",
            body: [
              "Copying a trend that does not fit the brand is the same mistake in a costume. The trend brought its own audience rather than yours, and the page reads as somebody else's for a week.",
              "Before joining one, ask these. If any answer is no, let it pass.",
            ],
            list: [
              "Would my customers recognise this as being about them?",
              "Can I show my product or service inside it without forcing it?",
              "Would I still be glad it was on the page in three months?",
            ],
          },
        ],
      },
      {
        id: "which-mistake-to-watch-in-your-industry",
        heading: "Which mistake to watch in your industry",
        body: [
          "Every business can make all eight, but each kind of business has one it slips into most easily, usually because of how its work runs day to day.",
        ],
        subsections: [
          {
            id: "restaurants-and-food-brands",
            heading: "Restaurants and food brands",
            body: [
              "The one to watch is inconsistent posting. Service hours leave little time to shoot, so the page goes quiet exactly when the kitchen is busiest, which is also when people are deciding where to eat.",
              "Shoot a few dishes properly on a quiet afternoon and keep them as the buffer for the busy weeks.",
            ],
          },
          {
            id: "interior-design-and-architecture",
            heading: "Interior design and architecture",
            body: [
              "The one to watch is a quiet version of only promotional content: a feed of finished rooms and nothing else. Finished rooms are proof, but on their own they never answer the questions that stop people calling, about cost, time and how the process works.",
              "Mix in the in-between: a material being chosen, a site visit, or a short answer to a common worry.",
            ],
          },
          {
            id: "manufacturing-and-export",
            heading: "Manufacturing and export",
            body: [
              "The one to watch is not analysing performance. Enquiries often arrive by email or phone weeks after someone first saw a post, so the link between the two is easy to lose.",
              "Ask every new enquiry how they first came across you, and write the answer down. After a quarter, those notes tell you which posts are doing the work.",
            ],
          },
        ],
      },
      {
        id: "where-to-start",
        heading: "Where to start if you are making several",
        body: ["Fix them in order. Each fix makes the next one easier, and fixing the later ones first mostly wastes effort."],
        flow: {
          caption: "The order to fix them in",
          steps: [
            { title: "Write the plan", text: "One goal and one audience, which fixes posting without a strategy." },
            { title: "Set a rhythm", text: "A schedule you can keep, which fixes inconsistent posting." },
            { title: "Change the mix", text: "Teaching, proof and behind the scenes alongside the offers." },
            { title: "Raise the craft", text: "Better light, one look, and specific hashtags." },
            { title: "Read it back", text: "A monthly review, so each month is better than the last." },
          ],
        },
      },
      {
        id: "a-monthly-check",
        heading: "A monthly check",
        body: ["Run through this at the end of each month. It takes a few minutes and catches most of these mistakes before they settle into habits."],
        table: {
          caption: "The monthly check",
          head: ["Check", "Question", "If the answer is no"],
          rows: [
            ["Plan", "Did every post serve the goal?", "Revisit the goal before planning next month"],
            ["Rhythm", "Did we post on the days we said we would?", "Lower the rhythm to one you can keep"],
            ["Mix", "Was there more to the month than offers?", "Add a teaching or proof post each week"],
            ["Replies", "Was every comment and message answered?", "Set a time each day to reply"],
            ["Craft", "Does the month's feed look like one business?", "Choose one edit and use it on everything"],
            ["Results", "Do we know which post did best, and why?", "Look at saves, shares and messages before planning"],
          ],
        },
        after: [
          "If you would like a team to run this check for you every month, see our [social media management](/services#social-media-management) service, or [talk to Kalaa](/contact).",
        ],
      },
    ],
    faq: [
      {
        question: "What is the most common social media mistake businesses make?",
        answer:
          "Posting without a strategy. When there is no goal or audience behind the posts, the page has no shape, and most of the other mistakes, such as inconsistent posting and all-promotional content, follow from it.",
      },
      {
        question: "How often should a small business post on social media?",
        answer:
          "As often as it can keep up every week, including in its busiest month. A steady rhythm matters more than a high one, because people learn to expect a page that posts on the same days.",
      },
      {
        question: "Do hashtags still work on Instagram?",
        answer:
          "They still help people find posts, but only when they are specific. A few tags that match what your customers actually search for do more than a long block of general ones.",
      },
      {
        question: "How do I know if my social media is working?",
        answer:
          "Check it against the goal you set. If the goal is enquiries, count the messages and calls that started on social media. Saves, shares and profile visits show which posts are earning attention along the way.",
      },
      {
        question: "Should my business join every trend?",
        answer:
          "No. Join a trend only when your customers would recognise it as being about them and your product fits inside it naturally. A trend that does not fit brings someone else's audience for a week and confuses your own.",
      },
      {
        question: "Is it better to post less often but with better quality?",
        answer:
          "Usually, yes, as long as you keep to the same days. A slower rhythm of good posts that you can sustain does more than a busy week followed by silence. Pick the pace you could keep in your busiest month.",
      },
      {
        question: "Should I delete old posts that did badly?",
        answer:
          "Rarely. An old post that did badly does little harm where it is, and deleting many at once can make a page look emptied out. Archive only posts that are wrong, out of date or off-brand, and spend the effort on next month instead.",
      },
    ],
  },

  /*
   * The long version, rewritten on 2026-09-11. The five ideas are the five on
   * the cover, in the cover's order, and the formats table takes its list from
   * the cover's own "Content formats to try" card. The industry examples use
   * the sectors Kalaa names. No statistic anywhere.
   */
  "instagram-content-ideas-for-small-businesses": {
    intro: [
      "The Instagram content ideas that work best for small businesses are behind-the-scenes posts, product highlights, customer stories, tips and how-tos, and lifestyle posts. Between them they give a small account enough variety to keep people looking, and none of them need a studio.",
      "A small business rarely runs out of things to say. It runs out of formats, and the fourth photograph of the same product is what a page looks like when that happens. Each idea below comes with examples, the format that suits it, and what it does for the business.",
    ],
    sections: [
      {
        id: "the-ideas-at-a-glance",
        heading: "The ideas at a glance",
        body: [],
        table: {
          caption: "Each idea, what it shows, and what it does for you",
          head: ["Idea", "What it shows", "Formats that suit it", "What it does for you"],
          rows: [
            ["Behind the scenes", "How the work gets made", "Reels and Stories", "Builds trust, because it is hard to fake"],
            ["Product highlights", "One product, one detail at a time", "Carousels, photos and Reels", "Turns attention into interest in something you sell"],
            ["Customer stories", "Real people using what you sell", "Carousels, Reels and Stories", "Answers doubts you cannot answer yourself"],
            ["Tips and how-tos", "Something useful, quickly", "Carousels and Reels", "Gets saved and shared, which keeps a post travelling"],
            ["Lifestyle and inspiration", "The product where it belongs", "Photos and Reels", "Helps someone picture owning it"],
          ],
        },
      },
      {
        id: "how-to-choose-which-ideas-to-start-with",
        heading: "How to choose which ideas to start with",
        body: [
          "You do not need all five from the first week. Start with the two that serve your goal best, get them running steadily, and add the others once the rhythm holds.",
        ],
        table: {
          caption: "Which ideas to lead with for each goal",
          head: ["If your goal is", "Lead with", "Why"],
          rows: [
            ["More enquiries", "Customer stories and product highlights", "They answer doubts and end with a clear next step"],
            ["Reaching new people", "Behind the scenes and tips, as Reels", "Reels travel beyond your followers, and tips get shared"],
            ["Trust from first-time visitors", "Customer stories and behind the scenes", "They show real people and real work, which is hard to fake"],
            ["Repeat customers", "Tips and new arrivals", "They give existing customers a reason to come back"],
          ],
        },
        after: [
          "If you have not set a goal yet, do that first. [How to plan your social media strategy](/blog/how-to-plan-your-social-media-strategy) walks through it.",
        ],
      },
      {
        id: "behind-the-scenes",
        heading: "Behind the scenes",
        body: [
          "Show the making, the workspace, or an ordinary day. It is the cheapest content you own and the hardest for a competitor to copy, because it is literally yours.",
          "It also does the work of proof. Somebody deciding whether you are real will believe a cluttered workbench before a polished product shot.",
        ],
        subsections: [
          {
            id: "behind-the-scenes-by-industry",
            heading: "Behind-the-scenes ideas by industry",
            body: ["What counts as behind the scenes depends on the business. These are starting points for the industries Kalaa works with."],
            table: {
              caption: "Behind-the-scenes post ideas by industry",
              head: ["Industry", "Post idea"],
              rows: [
                ["Interior design", "A site before and after, or choosing materials with the brief on the table"],
                ["Architecture", "A sketch becoming a model, or the first day on site"],
                ["Restaurants and food", "Prep before service, or one dish plated from start to finish"],
                ["Manufacturing", "A machine running a part, or the quality check before dispatch"],
                ["Import and export", "Goods being inspected, packed and loaded for shipping"],
              ],
            },
          },
        ],
      },
      {
        id: "product-highlights",
        heading: "Product highlights",
        body: [
          "Take one product and show one thing about it. The detail, the material, the size in a hand. A post about everything a product does is a post about nothing.",
          "Say what it costs or where to get it. A highlight with no next step is a nice picture.",
        ],
        flow: {
          caption: "How to build a product highlight",
          steps: [
            { title: "Pick one detail", text: "The material, the finish, a feature, or the size in a hand." },
            { title: "Show it close", text: "Fill the frame with that detail so it can be seen on a phone screen." },
            { title: "Say what it is for", text: "One line on why that detail matters to the person buying." },
            { title: "Give the next step", text: "The price, where to buy it, or a prompt to send a message." },
          ],
        },
        subsections: [
          {
            id: "angles-that-keep-product-posts-fresh",
            heading: "Angles that keep product posts fresh",
            body: [],
            list: [
              "**The detail:** stitching, grain, finish or texture, up close.",
              "**The size:** the product in a hand, or beside something familiar.",
              "**The choice:** the same product in each colour or size you sell.",
              "**The new arrival:** what just came in, and why you chose it.",
              "**The favourite:** the product people ask about most, and the reason they ask.",
            ],
          },
        ],
      },
      {
        id: "customer-stories",
        heading: "Customer stories",
        body: [
          "A customer describing what worried them before they bought will answer a question you cannot answer yourself without sounding like an advertisement.",
          "Ask while the purchase is fresh, and ask for the specific thing rather than a general compliment.",
        ],
        flow: {
          caption: "How to collect a customer story",
          steps: [
            { title: "Ask while it is fresh", text: "Soon after delivery or the finished job, while the experience is still clear." },
            { title: "Ask a specific question", text: "What worried you before you bought, and how did it turn out?" },
            { title: "Get permission", text: "Ask before you post their words, their photograph or their name." },
            { title: "Share it as they said it", text: "Their own words, lightly trimmed, never rewritten into yours." },
          ],
        },
        after: [
          "A story in a customer's own words is worth more than a polished line, because readers can tell the difference. Never write a review on someone's behalf, however kind the intention.",
        ],
      },
      {
        id: "tips-and-how-tos",
        heading: "Tips and how-tos",
        body: [
          "Short useful tips are what get saved and sent on, and saves are the signal that keeps a post moving after its first day. Say the useful thing first and leave the introduction out.",
          "The best tips answer a question your customers already ask. Keep a list of the questions that come up in messages and at the counter, and each one is a post.",
        ],
        table: {
          caption: "Kinds of tip post, with a home decor brand as the example",
          head: ["Kind of tip", "Example"],
          rows: [
            ["How to choose", "How to pick the right rug size for a room"],
            ["How to care for it", "How to keep brass pieces looking new"],
            ["Mistakes to avoid", "Hanging artwork too high on a wall"],
            ["Before and after", "The same corner styled two ways"],
            ["Quick fact", "What makes one fabric wear better than another"],
          ],
        },
      },
      {
        id: "lifestyle-and-inspiration",
        heading: "Lifestyle and inspiration",
        body: [
          "Lifestyle posts do a different job. They show the product where it belongs rather than on a white background, so somebody can picture owning it.",
          "They work best when the setting matches the buyer. A kitchen tool shown in a kitchen your customers would recognise does more than one shown in a showroom they never visit.",
        ],
        list: [
          "Show the product being used as well as sitting still.",
          "Use settings your customers would recognise from their own homes or workplaces.",
          "Keep the same light and colour as the rest of the feed, so the post still looks like you.",
        ],
      },
      {
        id: "which-format-suits-each-idea",
        heading: "Which format suits each idea",
        body: [
          "The idea decides what to say. The format decides how it is seen. These are the formats most small businesses use on Instagram, and what each one is good at.",
        ],
        table: {
          caption: "Instagram formats and what each is good at",
          head: ["Format", "Good at", "Try it for"],
          rows: [
            ["Reels", "Reaching people who do not follow you yet", "Behind the scenes, quick tips, customer reactions"],
            ["Carousels", "Teaching in steps, and getting saved", "How-tos, product details, before and after"],
            ["Stories", "Staying in touch with people who already follow you", "Everyday moments, polls, questions, new stock"],
            ["Single photos", "One strong image", "Finished work, lifestyle shots, announcements"],
            ["Trending audio", "Joining something people are already watching", "Only the trends that fit what you sell"],
          ],
        },
      },
      {
        id: "captions-that-do-their-job",
        heading: "Captions that do their job",
        body: [
          "The picture stops the scroll and the caption decides what happens next. Each idea wants a slightly different caption, but the shape is the same: open with the thing the post is about, and end with the one step you want the reader to take.",
        ],
        table: {
          caption: "How to open and close a caption for each idea",
          head: ["Idea", "Open with", "End with"],
          rows: [
            ["Behind the scenes", "What is happening, in the present tense", "An invitation to ask about the process"],
            ["Product highlights", "The one detail the post is about", "The price, where to buy it, or a prompt to message"],
            ["Customer stories", "The worry the customer had before buying", "How someone else can get the same result"],
            ["Tips and how-tos", "The useful thing itself, with no warm-up", "A prompt to save the post for later"],
            ["Lifestyle and inspiration", "The moment or setting the picture shows", "Where the product can be seen or bought"],
          ],
        },
        after: [
          "Put the words a buyer would search for in the caption as well, such as what the product is and the area you serve. It helps the post turn up when someone searches for it.",
        ],
      },
      {
        id: "stories-for-the-days-between-posts",
        heading: "Stories for the days between posts",
        body: [
          "Stories keep you in front of the people who already follow you without filling the feed. They disappear after a day, which makes them the place for small, everyday things, and Instagram's own stickers do most of the work.",
        ],
        table: {
          caption: "Story stickers and what to use each one for",
          head: ["Sticker or idea", "Use it for"],
          rows: [
            ["Poll", "Letting followers choose between two colours, designs or dishes"],
            ["Question box", "Collecting the questions people want answered, which become tip posts"],
            ["Countdown", "A launch, a sale or an event, so followers get a reminder"],
            ["Link", "Sending people straight to a product page or a booking form"],
            ["Reshared customer posts", "Showing customers using what you sell, with their permission"],
          ],
        },
        after: [
          "Save the Stories worth keeping as highlights on your profile, grouped by topic, so a new visitor can find your prices, your work and your reviews without scrolling.",
        ],
      },
      {
        id: "a-simple-weekly-mix",
        heading: "A simple weekly mix",
        body: ["Rotating through the ideas stops the feed repeating itself. This is an example week to adapt, not a rule."],
        table: {
          caption: "An example week of posts",
          head: ["Day", "Idea", "Format"],
          rows: [
            ["Monday", "A tip or how-to", "Carousel"],
            ["Wednesday", "Behind the scenes", "Reel"],
            ["Friday", "A product highlight", "Photo or carousel"],
            ["Weekend", "A customer story or lifestyle post", "Reel or Stories"],
          ],
        },
        after: [
          "Choose a rhythm you can keep in your busiest month. Turning a week like this into a whole month is covered in [a month of content, in five steps](/blog/a-month-of-content-in-five-steps), and the planning behind it in [how to plan your social media strategy](/blog/how-to-plan-your-social-media-strategy).",
        ],
      },
      {
        id: "ideas-for-festivals-and-seasons",
        heading: "Ideas for festivals and seasons",
        body: [
          "The calendar hands you ideas every month. A festival or a season gives people a reason to look, as long as the post connects the moment to what you actually sell.",
        ],
        table: {
          caption: "Occasions, and post ideas that connect them to a business",
          head: ["Occasion", "Post idea", "Keep in mind"],
          rows: [
            ["Diwali and Navratri", "Gift ideas from your range, or your space dressed for the festival", "Plan these weeks ahead, because the feed gets crowded"],
            ["Wedding season", "Pieces, menus or services people buy for weddings", "Show them in real use, not only on a table"],
            ["Monsoon", "What changes for your customers in the rains, and how you help", "Keep it practical rather than decorative"],
            ["New Year", "A look back at the year's work, or what is coming next", "One post is enough; a week of it tires people"],
            ["Your own anniversary", "How the business started, and the people behind it", "It is a behind-the-scenes post with a date on it"],
          ],
        },
      },
      {
        id: "a-worked-example-a-restaurants-first-month",
        heading: "A worked example: a restaurant's first month",
        body: [
          "Here is how the five ideas could fill the first month for a small restaurant starting to post properly. It illustrates the method rather than describing a real client.",
        ],
        table: {
          caption: "A first month of posts for a small restaurant",
          head: ["Week", "Posts", "What the week is for"],
          rows: [
            ["Week one", "The kitchen before service as a Reel, and the signature dish as a photo", "Showing who you are and what you are known for"],
            ["Week two", "How a dish is made as a carousel, and a regular's order as a Story", "Giving people something useful and something real"],
            ["Week three", "A new menu item up close, and a poll on which dish to feature next", "Turning attention into interest and replies"],
            ["Week four", "A diner's photo reshared with permission, and the best table for groups as a lifestyle shot", "Proof from customers, and a reason to book"],
          ],
        },
        after: [
          "Every idea appears in the month, and none of them repeats in the same week. That variety is what keeps people looking between the posts that ask them to book.",
        ],
      },
      {
        id: "how-to-tell-which-ideas-are-working",
        heading: "How to tell which ideas are working",
        body: [
          "Each idea is good at something different, so judge each one on the signal that matches its job rather than on likes alone.",
        ],
        table: {
          caption: "The signal to watch for each idea",
          head: ["Idea", "The signal that matters", "What to do with it"],
          rows: [
            ["Behind the scenes", "Reach beyond your followers, and profile visits", "Keep the kind of moment that travelled, and film more like it"],
            ["Product highlights", "Messages, product taps and link clicks", "Repeat the detail or angle that brought questions"],
            ["Customer stories", "Messages that mention the story", "Ask more customers the same question"],
            ["Tips and how-tos", "Saves and shares", "Turn the most saved tip into a longer carousel"],
            ["Lifestyle and inspiration", "Saves and replies", "Use the settings people responded to again"],
          ],
        },
        after: [
          "Look at these once a month, not after every post. What to read and how often is covered in [common social media mistakes brands make](/blog/common-social-media-mistakes-brands-make).",
        ],
      },
      {
        id: "getting-it-done-every-week",
        heading: "Getting it done every week",
        body: [
          "The hard part is keeping ideas coming every week alongside running a business. Batch the shooting into one session that covers several weeks, keep a running list of the questions customers ask, and reuse what works in a new format instead of starting from nothing.",
          "If you would rather hand the making to a team, that is our [content creation](/services#content-creation) service, and our [social media management](/services#social-media-management) service runs the posting and the replies as well. [Talk to Kalaa](/contact) about either.",
        ],
      },
    ],
    faq: [
      {
        question: "What should a small business post on Instagram?",
        answer:
          "A mix of behind-the-scenes posts, product highlights, customer stories, tips and lifestyle posts. The mix matters more than any single idea, because it gives people a reason to keep looking between your offers.",
      },
      {
        question: "How do I come up with Instagram ideas when I run out?",
        answer:
          "Start from the questions customers ask you, the steps of making or delivering what you sell, and the details of your products. Each of those is a post, and the same idea can be used again in a different format.",
      },
      {
        question: "Are Reels better than photo posts for a small business?",
        answer:
          "They do different jobs. Reels are better at reaching people who do not follow you yet, while photos and carousels are better at showing detail and getting saved. Most small accounts do best with both.",
      },
      {
        question: "How do I get customers to share their stories?",
        answer:
          "Ask soon after they have bought or the work is finished, ask a specific question rather than for a general review, and always get their permission before you post their words or photograph.",
      },
      {
        question: "Can I make good Instagram content with just a phone?",
        answer:
          "Yes. Window light, a plain background, a steady hand and one consistent edit get a phone most of the way. Professional shoots are worth it for the images that carry the most weight, such as launches and your most popular products.",
      },
      {
        question: "What is the best time to post on Instagram?",
        answer:
          "There is no single best time for every business. Check your own insights, which show when your followers are most active, and post shortly before that. Then keep to the same days so people learn when to expect you.",
      },
      {
        question: "Should I use trending audio in my Reels?",
        answer:
          "Only when the trend fits what you sell and your customers would recognise it as being about them. Trending audio can help a Reel travel, but a trend that does not fit brings people who will never buy.",
      },
    ],
  },

  /*
   * The long version, rewritten on 2026-09-11. The six shots are the six ticked
   * in the cover's notebook, in its order, and the kit table is the kit on the
   * cover's desk: phone, gimbal, ring light, tripod, microphone. No prices and
   * no statistic anywhere.
   */
  "video-shooting-ideas-for-small-businesses": {
    intro: [
      "The easiest videos for a small business to shoot are product close-ups, behind-the-scenes clips, the packaging process, a day in the life, customer reactions, and quick tips or how-tos. All six can be filmed on a phone, and each one does a different job for the business.",
      "You do not need a crew. Almost everything below is one person, a phone, and enough light from a window. Each shot comes with what to film, how to film it, and what it is for.",
    ],
    sections: [
      {
        id: "the-shots-at-a-glance",
        heading: "The shots at a glance",
        body: [],
        table: {
          caption: "Each shot, what to film, and what it does for you",
          head: ["Shot", "What to film", "What it does for you"],
          rows: [
            ["Product close-up", "One detail filling the frame, moving slowly", "Shows what a photograph cannot"],
            ["Behind the scenes", "The work being done, as it happens", "Builds trust, because it is hard to fake"],
            ["Packaging process", "An order being packed, start to finish", "Shows the care before the customer sees it"],
            ["Day in the life", "Short clips across one working day", "Puts faces and a routine to the business"],
            ["Customer reactions", "A customer opening or using what they bought", "Proof you cannot write yourself"],
            ["Quick tips and how-tos", "One useful idea, said first", "Gets saved and shared, so it keeps travelling"],
          ],
        },
      },
      {
        id: "which-shot-to-start-with",
        heading: "Which shot to start with",
        body: [
          "If you are new to video, do not try all six in the first week. Pick the one that matches what you need most right now, get comfortable with it, then add the next.",
        ],
        table: {
          caption: "The shot to start with for each need",
          head: ["If you need", "Start with", "Why"],
          rows: [
            ["People to understand what you sell", "Product close-ups", "They show the thing itself, in detail, with no explaining"],
            ["People to trust a business they have not met", "Behind the scenes and a day in the life", "They show real people and real work"],
            ["Proof for people who are almost ready to buy", "Customer reactions", "Someone else saying it is more convincing than you saying it"],
            ["Reach beyond your current followers", "Quick tips and how-tos", "Useful videos get saved and shared on"],
            ["Online orders to feel safe", "The packaging process", "It shows the care before the parcel arrives"],
          ],
        },
      },
      {
        id: "what-you-need-to-start",
        heading: "What you need to start",
        body: [
          "The phone you already have is enough for every shot here. The rest of the kit makes the same shots steadier, brighter or clearer, and you can add it as you go.",
        ],
        table: {
          caption: "Kit for filming on a phone",
          head: ["Kit", "What it does", "When you need it"],
          rows: [
            ["A phone", "Films everything below", "From day one"],
            ["Window light", "Soft, even light that flatters products and faces", "From day one, and it costs nothing"],
            ["A small tripod", "Holds the shot still for close-ups and talking to camera", "Early on"],
            ["A ring light", "Steady light when there is no good window, or after dark", "When you film indoors often"],
            ["A clip-on microphone", "Clear voice when you talk to camera", "When you start speaking in your videos"],
            ["A gimbal", "Smooth movement while you walk or follow the action", "Later, for walk-throughs and day-in-the-life clips"],
          ],
        },
      },
      {
        id: "fixing-common-problems",
        heading: "Fixing the problems that show up most",
        body: [
          "Most phone videos that look amateur have one of a few problems, and each has a simple fix that costs little or nothing.",
        ],
        table: {
          caption: "Common problems in phone video, and how to fix them",
          head: ["Problem", "Usual cause", "Fix"],
          rows: [
            ["Shaky footage", "Holding the phone at arm's length", "Rest it on something, use a tripod, or hold it close with both hands"],
            ["Dark or grainy picture", "Too little light, so the phone boosts it", "Film beside a window in daylight, or add a ring light"],
            ["Orange or green tint", "Overhead bulbs mixed with daylight", "Switch the room lights off and use one light source"],
            ["Echoey or muffled voice", "The phone is far away in a bare room", "Move closer, film in a room with soft furnishings, or clip on a microphone"],
            ["A bright window behind a dark subject", "Filming towards the light", "Turn around so the window lights the subject from the side or the front"],
            ["A tilted horizon", "The phone held at a slight angle", "Turn on the grid in the camera settings and line it up"],
          ],
        },
      },
      {
        id: "product-close-up",
        heading: "Product close-up",
        body: [
          "Get near enough that a detail fills the frame, and move slowly. Close work is the thing a still photograph cannot do, so it is the first shot worth learning.",
          "Shoot it twice, once steady and once moving, and keep whichever holds attention longer.",
        ],
        flow: {
          caption: "How to film a product close-up",
          steps: [
            { title: "Clean the product and the lens", text: "Dust and fingerprints show far more in a close-up than in a photograph." },
            { title: "Find the light", text: "Place the product beside a window, with the light coming from one side." },
            { title: "Get close and move slowly", text: "Let one detail fill the frame, and move the phone slower than feels natural." },
            { title: "Film it twice", text: "Once held still, once moving, then keep the take that holds attention longer." },
          ],
        },
      },
      {
        id: "behind-the-scenes",
        heading: "Behind the scenes",
        body: [
          "The interesting part is almost always the step you find boring. What is routine to you is new to someone who has never seen how your work is done, and it is the one thing a competitor cannot copy.",
        ],
        table: {
          caption: "Behind-the-scenes video moments by industry",
          head: ["Industry", "Moment to film"],
          rows: [
            ["Interior design", "A room being set up for the reveal, as a time-lapse"],
            ["Architecture", "A walk through a site, from the empty plot to the frame going up"],
            ["Restaurants and food", "The first dish of service, from the pass to the table"],
            ["Manufacturing", "One part moving through the line, finished and checked"],
            ["Import and export", "A shipment being counted, sealed and loaded"],
          ],
        },
      },
      {
        id: "packaging-process",
        heading: "Packaging process",
        body: [
          "Packing an order is one of the most watched things a small business posts, and it is the least staged. Start recording before you start packing.",
        ],
        list: [
          "**Film from above** so the box, the product and your hands are all in the frame.",
          "**Keep it clean.** A tidy table makes the packing look careful.",
          "**Show the finishing touch:** the note, the ribbon, or the seal.",
          "**Leave the address out.** Blur or cover any label with a customer's name or details on it.",
        ],
      },
      {
        id: "day-in-the-life",
        heading: "Day in the life",
        body: [
          "Three or four short clips across one working day, cut together, will tell somebody more about the business than a page of copy. It works because it is specific. Opening up, the first order, the delivery run.",
        ],
        table: {
          caption: "A simple day-in-the-life shot list",
          head: ["Moment", "What to film", "Why it works"],
          rows: [
            ["Opening up", "Keys, lights, the shutter going up", "An easy, recognisable start"],
            ["The first job", "The first order, client or dish of the day", "Shows what the business actually does"],
            ["The busy part", "The rush, the site or the workshop at full speed", "Gives the video its energy"],
            ["Closing", "The last delivery, or the lights going off", "A natural end that makes people watch to the finish"],
          ],
        },
      },
      {
        id: "customer-reactions",
        heading: "Customer reactions",
        body: [
          "A customer opening or using the thing is proof you cannot write yourself. Ask before you film, and keep it short.",
        ],
        list: [
          "**Ask first, every time.** Filming someone who has not agreed to it undoes the trust you are trying to show.",
          "**Keep it real.** Do not script what they say, and do not ask them to act surprised.",
          "**Get it in writing** if you plan to use the clip in an advertisement.",
          "**Say thank you in the caption,** and tag them only if they are happy to be tagged.",
        ],
      },
      {
        id: "quick-tips-and-how-tos",
        heading: "Quick tips and how-tos",
        body: [
          "A quick tip, one idea in fifteen seconds, is the format most likely to be saved. Say the useful thing first and leave the introduction out.",
        ],
        flow: {
          caption: "How to structure a quick tip video",
          steps: [
            { title: "Open with the useful thing", text: "The tip itself, in the first line, before anything else." },
            { title: "Show it", text: "Do it on screen, so it can be copied without the sound on." },
            { title: "Say why it works", text: "One short line, so the tip is remembered." },
            { title: "End with one prompt", text: "Save this, send it to a friend, or message us. One, not all three." },
          ],
        },
      },
      {
        id: "openings-that-hold-attention",
        heading: "Openings that hold attention",
        body: [
          "The first seconds decide whether anyone watches the rest. Start on the most interesting frame and say, or show, why the video is worth staying for. An opening that warms up slowly loses people before the good part arrives.",
        ],
        table: {
          caption: "A strong opening for each shot",
          head: ["Shot", "Open on"],
          rows: [
            ["Product close-up", "The detail already filling the frame, with no wide shot first"],
            ["Behind the scenes", "The work already in motion, not the setup before it"],
            ["Packaging process", "The product going into the box, with the finished parcel saved for the end"],
            ["Day in the life", "The busiest moment of the day, then back to the start"],
            ["Customer reactions", "The moment of the reaction itself"],
            ["Quick tips and how-tos", "The tip in one line, spoken or on screen"],
          ],
        },
        after: [
          "Put a few words of text on screen in the opening as well. Many people watch with the sound off, and the text is what tells them to stay.",
        ],
      },
      {
        id: "planning-a-shoot",
        heading: "Planning a shoot",
        body: [
          "Filming a little every day wears people out and gives the month an uneven look. One planned session covering several weeks is faster and more consistent.",
        ],
        flow: {
          caption: "One shoot for several weeks of video",
          steps: [
            { title: "Pick the ideas", text: "Choose the shots for the next few weeks from the list above." },
            { title: "Write a shot list", text: "Each clip, where it is filmed, and what is needed for it." },
            { title: "Shoot in one session", text: "Same light and same setup, one shot after another." },
            { title: "Edit in a batch", text: "Cut every video in one sitting, with the same look on each." },
            { title: "Schedule them", text: "Spread the videos across the weeks, and reply as they go out." },
          ],
        },
        after: [
          "How these videos fit into a full month of posting is covered in [a month of content, in five steps](/blog/a-month-of-content-in-five-steps), and ideas for the posts in between are in [Instagram content ideas for small businesses](/blog/instagram-content-ideas-for-small-businesses).",
        ],
      },
      {
        id: "a-worked-example-one-shoot-for-an-interior-design-studio",
        heading: "A worked example: one shoot for an interior design studio",
        body: [
          "Here is what a single afternoon's shot list might look like for a small interior design studio with one finished project to show. It illustrates the method rather than describing a real client.",
        ],
        table: {
          caption: "One afternoon's shot list, and what each clip becomes",
          head: ["Clip", "Where it is filmed", "What it becomes"],
          rows: [
            ["A slow pan across the finished living room", "On site, in morning light", "A lifestyle Reel, and the cover of a project carousel"],
            ["Close-ups of the materials", "On site, beside the window", "A product close-up on the fabrics and finishes"],
            ["The designer walking through the brief", "On site, talking to camera", "A behind-the-scenes Reel on how the room was planned"],
            ["The homeowner seeing the room", "On site, with their permission", "A customer reaction clip"],
            ["One tip on choosing a rug size", "At the studio", "A quick tip video"],
          ],
        },
        after: [
          "One planned afternoon fills several weeks of posts, because every clip was decided before anyone arrived on site.",
        ],
      },
      {
        id: "editing-and-posting",
        heading: "Editing and posting",
        body: ["Most of what makes a phone video look finished happens in the edit, and none of it needs expensive software."],
        list: [
          "**Cut the start.** Begin on the first interesting frame, not on you pressing record.",
          "**Add on-screen text** so the video still makes sense with the sound off.",
          "**Use one look.** The same colour and text style on every video makes the account read as one business.",
          "**Write the caption for the search.** Say plainly what the video shows, the way a customer would search for it.",
        ],
        after: [
          "If you would rather hand the filming and editing to a team, that is our [content creation](/services#content-creation) service, and our [social media management](/services#social-media-management) service posts it and handles the replies.",
        ],
      },
      {
        id: "where-each-video-goes",
        heading: "Where each video goes",
        body: [
          "The same clip can go to several places, but each place has its own shape. Film vertically by default, because most of the places your customers watch on a phone are vertical.",
        ],
        table: {
          caption: "Where to post a video, the shape it needs, and what suits it",
          head: ["Where", "Shape", "What suits it"],
          rows: [
            ["Instagram Reels", "Vertical, 9:16", "Close-ups, quick tips and behind the scenes, to reach new people"],
            ["Instagram and Facebook Stories", "Vertical, 9:16", "Everyday moments and new stock, for people who already follow you"],
            ["YouTube Shorts", "Vertical, 9:16", "The same short videos, for people who search on YouTube"],
            ["YouTube", "Horizontal, 16:9", "Longer walk-throughs and explanations"],
            ["WhatsApp status", "Vertical", "A quick look at what is new, for customers who have your number"],
            ["Your website", "Horizontal or square", "A short product or project video beside the details"],
          ],
        },
      },
      {
        id: "quick-reference",
        heading: "Quick reference",
        body: [],
        table: {
          caption: "Every shot in one line",
          head: ["Shot", "The brief"],
          rows: [
            ["Product close-up", "One detail, window light, slow movement"],
            ["Behind the scenes", "The routine step, filmed as it happens"],
            ["Packaging process", "From above, start to finish, no customer details"],
            ["Day in the life", "Opening, first job, busy part, closing"],
            ["Customer reactions", "With permission, unscripted, short"],
            ["Quick tips and how-tos", "The useful thing first, shown on screen"],
          ],
        },
        after: ["If you would like help planning the first shoot, [talk to Kalaa](/contact)."],
      },
    ],
    faq: [
      {
        question: "What videos should a small business post?",
        answer:
          "Start with product close-ups, behind-the-scenes clips, the packaging process, a day in the life, customer reactions and quick tips. Between them they show what you sell, how you work and what customers think, which covers most of what a new customer wants to know.",
      },
      {
        question: "Do I need expensive equipment to film videos for my business?",
        answer:
          "No. A phone and a window cover every idea in this guide. A small tripod, a ring light and a clip-on microphone make the same videos steadier and clearer, and a gimbal helps later with moving shots.",
      },
      {
        question: "How long should a small business video be?",
        answer:
          "Long enough to say one thing well and no longer. Most social videos work best well under a minute, and a quick tip often needs only a few seconds once the useful part comes first.",
      },
      {
        question: "How do I film customers without it feeling staged?",
        answer:
          "Ask their permission, then film what they would do anyway, such as opening a delivery or using the product. Do not script their words or ask them to perform a reaction. A real, short moment is more convincing than a polished one.",
      },
      {
        question: "How often should a small business post videos?",
        answer:
          "As often as you can keep up every week, even in your busiest month. Filming several weeks of videos in one session makes a steady rhythm much easier to hold.",
      },
      {
        question: "Should I film vertically or horizontally?",
        answer:
          "Vertically for Reels, Stories, Shorts and WhatsApp status, which covers most of what small businesses post. Film horizontally only for longer YouTube videos or a video that will sit on your website.",
      },
      {
        question: "Do I need to show my face in my business videos?",
        answer:
          "No, but it helps. Plenty of good business videos show only hands, products and places. A face, even now and then, makes the business feel like people rather than a shop front, and that is what makes a new customer comfortable getting in touch.",
      },
    ],
  },

  /*
   * The long version, rewritten on 2026-09-11. The ten trends are the ten cards
   * ringed round the binoculars on the cover, grouped as before into the four
   * decisions they change. A trends piece is where invented numbers usually
   * live; there are none here, and nothing predicts a figure.
   */
  "marketing-trends-to-watch": {
    intro: [
      "The marketing trends worth planning around are short-form video, immersive formats such as AR, user-generated content, a new kind of influencer marketing, community-led growth, AI in content production, data-driven personalisation, value-first storytelling, purpose-driven marketing, and shopping inside social apps.",
      "Trends are only worth reading if they change what you do on Monday. These do. They are grouped below into the four decisions they affect, with what to do about each one and how to tell which matter for your business.",
    ],
    sections: [
      {
        id: "the-trends-at-a-glance",
        heading: "The trends at a glance",
        body: [],
        table: {
          caption: "Each trend, what is changing, and what to do about it",
          head: ["Trend", "What is changing", "What to do about it"],
          rows: [
            ["Short-form video dominance", "Short vertical video sets the pace on every platform", "Make short video a regular part of the plan, not an extra"],
            ["AR, VR and immersive experiences", "Shoppers can try products on, or place them in a room", "Watch it if people need to see your product on themselves or in a space"],
            ["Authentic user-generated content", "Customers' own posts are trusted more than brand posts", "Make it easy for customers to share, and ask permission to repost"],
            ["Influencer marketing 2.0", "Smaller, specialist creators outperform big general ones", "Work with creators whose audience matches your customers"],
            ["Community-led growth", "Customers talk to each other, not only to the brand", "Give people a place and a reason to talk about your category"],
            ["AI-powered content and automation", "Drafts, variations and edits are faster to produce", "Use it for production, and keep people for the judgement"],
            ["Data-driven personalisation", "The same offer is shaped for different groups", "Split your audience into a few groups and speak to each"],
            ["Value-first storytelling", "Content earns attention by being useful first", "Lead with the useful part, and sell after"],
            ["Sustainable and purpose-driven marketing", "Buyers notice what a business stands for", "Say only what you can show, and show it"],
            ["Social commerce and in-app shopping", "People can buy without leaving the app", "Set up shop features so the content can be bought from"],
          ],
        },
      },
      {
        id: "what-stays-the-same",
        heading: "What stays the same underneath",
        body: [
          "Every trend on this list is a new way of doing something marketing has always had to do. Seeing the old job underneath a new trend makes it easier to judge, because you can ask whether it does that job better than what you already do.",
        ],
        table: {
          caption: "Each trend, and the lasting job it does",
          head: ["Trend", "The lasting job underneath it"],
          rows: [
            ["Short-form video", "Getting attention where your customers already spend it"],
            ["User-generated content", "Proof from someone other than you"],
            ["Specialist influencers", "A recommendation from someone people trust"],
            ["Community-led growth", "Keeping the customers you already have"],
            ["AI in content production", "Making the work faster to produce"],
            ["Personalisation", "Knowing who you are talking to"],
            ["Value-first storytelling", "Being useful before asking for anything"],
            ["Purpose-driven marketing", "Being honest about what you stand for"],
            ["Immersive formats", "Helping someone picture owning the product"],
            ["Social commerce", "Removing the steps between wanting and buying"],
          ],
        },
        after: [
          "If a trend does its job no better than something you already do well, you can let it pass without falling behind.",
        ],
      },
      {
        id: "how-people-watch",
        heading: "How people watch",
        body: ["The first two trends are about the format people expect to find content in."],
        subsections: [
          {
            id: "short-form-video-dominance",
            heading: "Short-form video dominance",
            body: [
              "Short-form video keeps taking attention from every other format, and it now sets the pace on every platform rather than one.",
              "For a small business, the practical change is to plan video in from the start instead of adding it when there is time. Shooting several weeks of clips in one session makes that realistic. Ideas for what to film are in [video shooting ideas for small businesses](/blog/video-shooting-ideas-for-small-businesses).",
            ],
          },
          {
            id: "ar-vr-and-immersive-experiences",
            heading: "AR, VR and immersive experiences",
            body: [
              "Immersive formats, including try-ons in augmented reality, are moving from novelty to something a shopper expects in a few categories. Worth watching if you sell anything people want to see on themselves or in a room.",
              "Most small businesses do not need to build anything yet. Filter and effect tools inside the social apps, and simple 360-degree product views, are the low-cost way to try the idea first.",
            ],
          },
        ],
      },
      {
        id: "who-people-believe",
        heading: "Who people believe",
        body: ["The next three trends share one idea: people trust other people more than they trust a brand talking about itself."],
        subsections: [
          {
            id: "authentic-user-generated-content",
            heading: "Authentic user-generated content",
            body: [
              "Content made by real users carries further than content about the brand, because it is read as evidence rather than as a claim.",
              "Make it easy to happen. Ask happy customers to post and tag you, reply when they do, and always ask permission before you repost their photograph or words.",
            ],
          },
          {
            id: "influencer-marketing-2-0",
            heading: "Influencer marketing 2.0",
            body: [
              "Influence has moved the same way. A smaller account with a specific audience now does more for a specific business than a large one with a general audience.",
              "Choose creators by who follows them, not by how many. A local food creator whose followers eat out in your area is worth more to a restaurant than a national account with a larger number and the wrong people.",
            ],
            list: [
              "**Where the audience is:** most of the creator's followers should be in the area or market you sell to.",
              "**What the comments say:** real conversations are a better sign than rows of emojis.",
              "**How past partnerships look:** brand posts should sit naturally among their own content.",
              "**Whether the style fits:** their look and tone should sit comfortably beside your brand.",
              "**What you agree in writing:** what will be posted, when, and whether you can reuse it in your own posts or ads.",
            ],
            after: [
              "Paid posts should be labelled as paid. In India the ASCI guidelines for influencer advertising require that disclosure, and a clear label protects your business as well as the creator.",
            ],
          },
          {
            id: "community-led-growth",
            heading: "Community-led growth",
            body: [
              "Community-led growth is the version of this you own. A group of people who talk to each other about your category is worth more than a following that only talks to you.",
              "It can be small: a WhatsApp community for regular customers, a close-friends list for early access, or a monthly event people come back to.",
            ],
            flow: {
              caption: "Starting a small community around your business",
              steps: [
                { title: "Choose the group", text: "Regular customers, past clients, or people interested in your category." },
                { title: "Choose the place", text: "A WhatsApp community, a close-friends list, or a small Facebook group." },
                { title: "Give something first", text: "Early access, a useful tip, or a first look at something new." },
                { title: "Keep a rhythm", text: "Post on a predictable day, so members know when to look." },
                { title: "Let members talk", text: "Ask questions and invite answers, so it becomes a conversation rather than a noticeboard." },
              ],
            },
          },
        ],
      },
      {
        id: "how-the-work-gets-made",
        heading: "How the work gets made",
        body: ["Two trends are changing the production side of marketing more than the thinking side."],
        subsections: [
          {
            id: "ai-powered-content-and-automation",
            heading: "AI-powered content and automation",
            body: [
              "AI has changed the production step rather than the thinking step. It makes drafts, variants and cutdowns quickly, and it still needs somebody who knows the brand to choose between them.",
            ],
            table: {
              caption: "Where AI helps, and where a person still decides",
              head: ["Task", "AI is useful for", "A person still decides"],
              rows: [
                ["Writing", "First drafts and caption variations", "What is true, and what sounds like you"],
                ["Design", "Resizing and quick variations", "Whether it looks like your brand"],
                ["Video", "Captions, cutdowns and rough edits", "Which moments are worth keeping"],
                ["Planning", "Organising ideas into a calendar", "Which ideas serve the goal"],
                ["Replies", "Suggesting answers to common questions", "Anything about price, a complaint or a promise"],
              ],
            },
          },
          {
            id: "data-driven-personalisation",
            heading: "Data-driven personalisation",
            body: [
              "Personalisation from your own data is the other half. The same offer written for two segments beats one offer written for an average nobody is.",
              "Start simple: split the people you reach into two or three groups, such as new and returning customers, and write the offer for each. Paid campaigns make this easier to test, which is part of what our [campaign management](/services#campaign-management) service does.",
            ],
          },
        ],
      },
      {
        id: "what-people-buy-into",
        heading: "What people buy into",
        body: ["The last three trends are about why people choose one business over another, and how short the path to buying has become."],
        subsections: [
          {
            id: "value-first-storytelling",
            heading: "Value-first storytelling",
            body: [
              "Value-first storytelling means the post is useful before it is persuasive. A tip, an honest comparison or a behind-the-scenes explanation earns the attention that the offer then spends.",
            ],
            table: {
              caption: "Turning a sales post into a value-first one",
              head: ["Instead of", "Try"],
              rows: [
                ["A list of product features", "The question buyers ask before choosing, answered honestly"],
                ["A daily offer post", "A useful tip most days, and the offer once a week"],
                ["Saying the product is the best", "When it suits someone, and when something else would suit them better"],
                ["A polished advert", "How the thing is made, and why it is made that way"],
              ],
            },
            after: [
              "Useful posts are also the ones people save and send on, which is how they keep reaching people after the first day.",
            ],
          },
          {
            id: "sustainable-and-purpose-driven-marketing",
            heading: "Sustainable and purpose-driven marketing",
            body: [
              "Purpose-driven positioning means the business stands for something a customer can name. It only works when it is true and visible: local sourcing you can show, packaging you have actually changed, or a practice you can explain.",
              "Claims you cannot show do more harm than saying nothing, because customers check. Say only what you can prove.",
            ],
          },
          {
            id: "social-commerce-and-in-app-shopping",
            heading: "Social commerce and in-app shopping",
            body: [
              "Social commerce closes the gap between being convinced and buying. When the shop sits inside the app, the distance between the two is one tap, and the content has to be ready for that.",
              "The practical steps are a product catalogue connected to your account, product tags on posts, and a clear route to buy or message from every post that shows something for sale.",
            ],
          },
        ],
      },
      {
        id: "which-trends-matter-for-your-business",
        heading: "Which trends matter for your business",
        body: ["No business should chase all of these at once. The right ones depend on what you sell and how people buy it. These are starting points for the industries Kalaa works with."],
        table: {
          caption: "Trends to prioritise, by industry",
          head: ["Industry", "Trends to start with", "Why"],
          rows: [
            ["Interior design and architecture", "Short-form video, AR and immersive views, value-first storytelling", "Buyers need to picture a finished space before they commit"],
            ["Restaurants and food", "Short-form video, user-generated content, local creators", "Diners trust other diners, and food is judged on sight"],
            ["Retail and fashion", "Social commerce, user-generated content, personalisation", "The path from seeing to buying can be one tap"],
            ["Manufacturing and industry", "Value-first storytelling, AI for production, personalisation", "Buyers compare suppliers on expertise and reliability"],
            ["Import and export", "Value-first storytelling, community, purpose you can show", "Trust across distance is built on proof and consistency"],
          ],
        },
      },
      {
        id: "a-worked-example-a-restaurant-choosing-its-trends",
        heading: "A worked example: a restaurant choosing its trends",
        body: [
          "Here is how a small restaurant might work through the list for one quarter. It illustrates the method rather than describing a real client.",
        ],
        table: {
          caption: "One quarter of trend decisions for a small restaurant",
          head: ["Trend", "Decision", "How it will be judged"],
          rows: [
            ["Short-form video", "Try it: two Reels a week from one filming session", "Table bookings and messages that mention a video"],
            ["User-generated content", "Try it: reshare diners' posts, with permission", "Whether reshared posts bring more saves and profile visits"],
            ["Specialist influencers", "Try it small: one visit from a local food creator", "Bookings in the fortnight after their post"],
            ["Social commerce", "Not yet: bookings happen by phone and WhatsApp", "Revisit next quarter"],
            ["Immersive formats", "Let it pass: diners do not need to picture a dish in their home", "No test needed"],
          ],
        },
        after: [
          "Three trends tried, one postponed and one set aside, with every decision tied to the same goal. That is what acting on trends without chasing them looks like.",
        ],
      },
      {
        id: "how-to-act-on-a-trend",
        heading: "How to act on a trend without chasing it",
        body: [
          "Chasing every trend is how a page ends up looking like everyone else's. Copying one that does not fit is one of the [common social media mistakes brands make](/blog/common-social-media-mistakes-brands-make). A simple routine keeps you honest.",
        ],
        flow: {
          caption: "From noticing a trend to deciding on it",
          steps: [
            { title: "Check the fit", text: "Would your customers see this as being about them, and does your product fit inside it?" },
            { title: "Test it small", text: "Try it in a few posts or one small campaign, rather than rebuilding the plan around it." },
            { title: "Measure it against the goal", text: "Judge it on enquiries or sales, not on how popular the trend is." },
            { title: "Keep it or drop it", text: "Keep what moved the goal. Drop the rest without regret." },
          ],
        },
      },
      {
        id: "quick-reference",
        heading: "Quick reference",
        body: [],
        table: {
          caption: "One first step for each trend",
          head: ["Trend", "Start this month by"],
          rows: [
            ["Short-form video dominance", "Filming several weeks of short clips in one session"],
            ["AR, VR and immersive experiences", "Trying an in-app effect or a 360-degree product view"],
            ["Authentic user-generated content", "Asking your happiest customers to post and tag you"],
            ["Influencer marketing 2.0", "Listing local creators whose followers match your customers"],
            ["Community-led growth", "Starting a small group for your regular customers"],
            ["AI-powered content and automation", "Using it for first drafts, and editing every one"],
            ["Data-driven personalisation", "Writing one offer for new customers and one for returning ones"],
            ["Value-first storytelling", "Leading every post with the useful part"],
            ["Sustainable and purpose-driven marketing", "Writing down what you can actually prove you do"],
            ["Social commerce and in-app shopping", "Connecting a product catalogue to your account"],
          ],
        },
        after: [
          "If you want help deciding which of these fit your business, our [social media management](/services#social-media-management) and [content creation](/services#content-creation) services build them into a monthly plan. [Talk to Kalaa](/contact).",
        ],
      },
    ],
    faq: [
      {
        question: "What are the biggest marketing trends right now?",
        answer:
          "Short-form video, user-generated content, smaller specialist influencers, community-led growth, AI in content production, personalisation, value-first storytelling, purpose-driven marketing, immersive formats such as AR, and shopping inside social apps.",
      },
      {
        question: "Should a small business use AI for its content?",
        answer:
          "Yes, for production: first drafts, caption variations, resizing and rough edits. Keep a person responsible for what is true, what sounds like the brand, and anything involving price, complaints or promises.",
      },
      {
        question: "Is influencer marketing worth it for a small business?",
        answer:
          "It can be, when the creator's audience matches your customers. A smaller local or specialist creator usually suits a small business better than a large general account, because the people watching are the people who might buy.",
      },
      {
        question: "What is social commerce?",
        answer:
          "Social commerce means selling directly inside social apps, through product catalogues, tagged posts and in-app checkout or messaging, so a customer can go from seeing a product to buying it without leaving the app.",
      },
      {
        question: "How do I know which marketing trends to follow?",
        answer:
          "Follow the ones that fit how your customers buy. Check whether a trend fits your product and audience, test it small, and keep it only if it moves your goal, such as enquiries or sales.",
      },
      {
        question: "How often do marketing trends change?",
        answer:
          "Formats and platforms change quickly, while the jobs underneath them, such as earning attention, proof and trust, barely change at all. Reviewing trends once a quarter is enough for most small businesses.",
      },
      {
        question: "Does my business need to be on every new platform?",
        answer:
          "No. Be where your customers already look before they buy, and do that well. Add a new platform only when your customers are clearly there and you can keep it going alongside the ones you already run.",
      },
    ],
  },

  /*
   * The long version, rewritten on 2026-09-11. The five steps are the five
   * ticked in the cover's notebook: plan, create, share, analyse, grow, one
   * section each. This piece is the working month; the strategy the month sits
   * on is its own article, and the two link to each other rather than repeat.
   */
  "a-month-of-content-in-five-steps": {
    intro: [
      "A month of social media content runs in five steps: plan, create, share, analyse and grow. Plan the month before it starts, create the posts in batches, share them on a schedule and reply as they go out, analyse the results against the goal, then carry what worked into the next month.",
      "This is the rhythm we run on a client account, month after month. It is deliberately unexciting, because the point is that it repeats.",
    ],
    sections: [
      {
        id: "the-month-at-a-glance",
        heading: "The month at a glance",
        body: [],
        flow: {
          caption: "The monthly content cycle",
          steps: [
            { title: "Plan", text: "Decide the month before it starts: the dates, the mix of posts, and what each one is for." },
            { title: "Create", text: "Shoot and write in batches, so the month has one consistent look." },
            { title: "Share", text: "Post on schedule, and reply to what comes back the same day." },
            { title: "Analyse", text: "Read the month against the goal, and find the format that worked more than once." },
            { title: "Grow", text: "Keep what worked, drop what did not, and test one new thing." },
          ],
          loop: "Grow feeds straight into planning the next month, which is why the cycle compounds.",
        },
        table: {
          caption: "When each step happens, and what you end with",
          head: ["Step", "When in the month", "What you end with"],
          rows: [
            ["Plan", "The last week of the month before", "A calendar for every week"],
            ["Create", "The first days of the month, or earlier", "Posts and videos ready to go"],
            ["Share", "Throughout the month", "Posts published, and every reply answered"],
            ["Analyse", "The last days of the month", "A short review against the goal"],
            ["Grow", "Straight after the review", "A list of what to keep, drop and test"],
          ],
        },
      },
      {
        id: "before-you-start",
        heading: "Before you start: the strategy underneath",
        body: [
          "A month of content sits on top of a strategy: one goal, one audience, and a few content pillars. Without those, the month fills up with whatever is easiest to post. If you have not written them down yet, start with [how to plan your social media strategy](/blog/how-to-plan-your-social-media-strategy), then come back to this.",
        ],
      },
      {
        id: "the-tools-that-make-it-easier",
        heading: "The tools that make the month easier",
        body: [
          "None of this needs expensive software. Most of the month can run on free or built-in tools that a small business may already have.",
        ],
        table: {
          caption: "Tools for each job in the month, most of them free",
          head: ["Job", "Tool to use", "What it saves"],
          rows: [
            ["Keeping the calendar", "A shared spreadsheet or calendar", "One place where everyone can see what goes out and when"],
            ["Designing posts", "Canva, or the templates built into the apps", "Starting every graphic from nothing"],
            ["Editing video", "Instagram's own editor, or the editor built into your phone", "Sending clips out to be edited"],
            ["Scheduling", "Meta Business Suite, for Instagram and Facebook", "Being at your phone at the moment each post goes out"],
            ["Replying", "Quick replies in WhatsApp Business", "Typing the same answer to the same question"],
            ["Logging questions", "A note on your phone, or a column in the calendar", "Losing the ideas people hand you"],
          ],
        },
      },
      {
        id: "plan",
        heading: "Plan",
        body: [
          "The month is decided before it starts. The pillars, the dates that matter, and roughly what each post is for. A calendar agreed in advance is what stops the last week of the month becoming filler.",
        ],
        subsections: [
          {
            id: "what-goes-into-the-plan",
            heading: "What goes into the month's plan",
            body: [],
            list: [
              "**The goal for the month,** taken from the strategy, so every post can be checked against it.",
              "**The dates that matter:** launches, offers, festivals and seasonal moments for your customers.",
              "**The mix:** how the posts divide between your pillars, so the month is not all offers.",
              "**The formats:** which ideas become Reels, carousels, single photos or Stories.",
              "**Open slots:** a few gaps left on purpose for things that happen during the month.",
            ],
          },
          {
            id: "give-the-month-a-theme",
            heading: "Give the month a theme",
            body: [
              "A theme ties the month's posts together, so they read as one story rather than a set of unrelated updates. It also makes planning faster, because every idea can be checked against it.",
            ],
            table: {
              caption: "Kinds of monthly theme, with two businesses as examples",
              head: ["Kind of theme", "For an interior design studio", "For a restaurant"],
              rows: [
                ["The season", "Getting homes ready for the monsoon", "Comfort food for the rains"],
                ["A product or service", "Kitchens, from brief to finished room", "The new breakfast menu"],
                ["A question customers ask", "What a full-home project involves", "What to order on a first visit"],
                ["A milestone", "The studio's anniversary", "A year in the new location"],
              ],
            },
          },
          {
            id: "a-monthly-calendar-template",
            heading: "A monthly calendar template",
            body: ["This is an example to adapt, showing how the pillars can rotate across a month so no week is all selling."],
            table: {
              caption: "An example month, week by week",
              head: ["Week", "Focus", "Posts that week"],
              rows: [
                ["Week one", "Teaching and proof", "A how-to carousel, a finished-work post, a behind-the-scenes Reel"],
                ["Week two", "Behind the scenes", "A day-in-the-life Reel, a product highlight, a customer story"],
                ["Week three", "The month's offer or key date", "The offer post, a Reel supporting it, a reminder in Stories"],
                ["Week four", "Proof and community", "A customer story, a tip, a thank-you or look back at the month"],
              ],
            },
            after: [
              "For ideas to fill each slot, see [Instagram content ideas for small businesses](/blog/instagram-content-ideas-for-small-businesses).",
            ],
          },
        ],
      },
      {
        id: "create",
        heading: "Create",
        body: [
          "Shoot and write in batches rather than daily. One shoot covering three weeks costs less time than nine separate afternoons and gives the month a consistent look.",
          "Leave a gap in the plan on purpose. Something will happen in the month worth posting, and a full calendar has nowhere to put it.",
        ],
        flow: {
          caption: "A batch production day",
          steps: [
            { title: "Brief", text: "List every post in the month's plan, with what it needs." },
            { title: "Shoot", text: "Film and photograph everything in one session, in the same light." },
            { title: "Write", text: "Draft every caption in one sitting, so they share one voice." },
            { title: "Edit", text: "Apply the same look to every image and video." },
            { title: "Approve", text: "Check each post against the goal before it is scheduled." },
          ],
        },
        after: [
          "Shot ideas for the video part of the month are in [video shooting ideas for small businesses](/blog/video-shooting-ideas-for-small-businesses).",
        ],
      },
      {
        id: "share",
        heading: "Share",
        body: [
          "Post on the schedule, at the times the account's own data supports, and reply to what comes back the same day. The replies are part of the work rather than admin left over from it.",
        ],
        table: {
          caption: "What happens while the month's posts go out",
          head: ["Task", "When", "Why it matters"],
          rows: [
            ["Publish on schedule", "On the planned days", "People learn when to expect you"],
            ["Reply to comments and messages", "The same day", "An unanswered question is a lost enquiry"],
            ["Post Stories between posts", "Most days", "Keeps you in front of people who already follow you"],
            ["Log repeated questions", "As they come in", "Each one is a post for next month"],
            ["Fill the open slots", "When something happens", "Keeps the month current, not only planned"],
          ],
        },
      },
      {
        id: "analyse",
        heading: "Analyse",
        body: [
          "At the end of the month, read the account against the goal rather than against last month. Look for a format that worked more than once.",
        ],
        table: {
          caption: "The end-of-month review",
          head: ["Question", "Where to look", "What it tells you"],
          rows: [
            ["Did we move the goal?", "Messages, calls, clicks or sales from social", "Whether the month did its job"],
            ["Which posts were saved or shared most?", "Post insights", "What people found worth keeping"],
            ["Which format worked more than once?", "Insights, compared across the month", "What to repeat next month"],
            ["What did people ask?", "Your log of comments and messages", "What to answer in next month's posts"],
            ["What fell flat?", "Posts with the lowest reach and replies", "What to drop or change"],
          ],
        },
      },
      {
        id: "grow",
        heading: "Grow",
        body: [
          "Growth is what happens when the next month keeps that format and drops one that did not earn its place. It compounds slowly, and only if the reading actually happens.",
        ],
        list: [
          "**Keep** the format that worked more than once, on a new topic.",
          "**Drop** the post type that underperformed across the month, not after one bad day.",
          "**Test** one new thing, and only one, so you can tell whether it made the difference.",
          "**Answer** the questions people asked, as posts in next month's plan.",
        ],
      },
      {
        id: "signs-the-cycle-is-working",
        heading: "Signs the cycle is working",
        body: [
          "The first months are about building the habit. After a few cycles, look for these signs that it is starting to pay back:",
        ],
        list: [
          "**The same format works more than once,** so you know what to repeat.",
          "**People ask questions that show they have read the posts,** rather than asking what you do.",
          "**Enquiries mention a specific post or video** when they get in touch.",
          "**The plan gets easier to write,** because each month starts from what the last one taught you.",
        ],
      },
      {
        id: "when-the-month-goes-off-plan",
        heading: "When the month goes off plan",
        body: [
          "Something will always go differently from the calendar. The aim is to keep the rhythm going, not to follow the plan to the letter.",
        ],
        table: {
          caption: "What to do when the month changes under you",
          head: ["What happens", "What to do"],
          rows: [
            ["Stock runs out before the offer post", "Swap it for a behind-the-scenes post about what is coming, and take names for when it is back"],
            ["The shoot is cancelled", "Use the buffer of ready posts, and move the shoot rather than dropping it"],
            ["A post draws complaints", "Reply calmly in public, move the detail to a private message, and follow up once it is sorted"],
            ["Something newsworthy happens", "Use an open slot, but only if it genuinely connects to what you sell"],
            ["The busiest season arrives", "Drop to the lowest rhythm you can keep rather than stopping altogether"],
          ],
        },
      },
      {
        id: "a-worked-example-a-month-for-a-furniture-exporter",
        heading: "A worked example: a month for a furniture exporter",
        body: [
          "Here is how the five steps could shape one month for a small furniture manufacturer that sells to overseas buyers. It illustrates the method rather than describing a real client.",
        ],
        table: {
          caption: "One month of content for a furniture exporter",
          head: ["Week", "Posts", "What the week is for"],
          rows: [
            ["Week one", "A finished dining set in natural light, and a Reel of the joinery up close", "Showing quality that buyers can judge from a distance"],
            ["Week two", "The workshop at the start of a shift, and a carousel on the woods used", "Proving the business is real and knows its material"],
            ["Week three", "A container being packed and loaded, and a post on how shipping works", "Answering the questions overseas buyers ask first"],
            ["Week four", "A buyer's showroom photo shared with permission, and a look back at the month", "Proof from customers, and a reason to enquire"],
          ],
        },
        after: [
          "The review at the end of the month would count enquiries from LinkedIn and the website, and note which topics those enquiries asked about. That list becomes the next month's plan.",
        ],
      },
      {
        id: "who-does-what",
        heading: "Who does what",
        body: [
          "A small business can run this cycle itself, or hand parts of it to a team. What matters is that someone owns each step, so none of them quietly stops happening.",
        ],
        table: {
          caption: "Running the month yourself, or with a team",
          head: ["Step", "Doing it yourself", "With Kalaa"],
          rows: [
            ["Plan", "An hour at the end of each month with a calendar", "We plan the month with you, around your goal"],
            ["Create", "A batch shoot and a writing session", "We make the posts and Reels"],
            ["Share", "Scheduling, plus a daily time to reply", "We post and keep the account moving"],
            ["Analyse", "A short review at the end of the month", "We read what came back and report it"],
            ["Grow", "A keep, drop and test list", "We build the next month on what worked"],
          ],
        },
        after: [
          "The whole cycle is what our [social media management](/services#social-media-management) service runs, with [content creation](/services#content-creation) for the making. [Talk to Kalaa](/contact) about taking it off your hands.",
        ],
      },
      {
        id: "quick-reference",
        heading: "Quick reference",
        body: [],
        table: {
          caption: "The month in one table",
          head: ["Step", "Main task", "Output"],
          rows: [
            ["Plan", "Set the goal, dates, mix and formats", "A weekly calendar"],
            ["Create", "Batch the shooting, writing and editing", "Ready-to-post content"],
            ["Share", "Publish on schedule and reply the same day", "An active account"],
            ["Analyse", "Review the month against the goal", "What worked, and what did not"],
            ["Grow", "Keep, drop and test", "A better plan for next month"],
          ],
        },
      },
    ],
    faq: [
      {
        question: "How far ahead should I plan social media content?",
        answer:
          "A month ahead is the useful window for most businesses. It is long enough to plan around key dates and batch the production, and short enough to stay current. Leave a few open slots for things that happen during the month.",
      },
      {
        question: "How many posts should I make in a month?",
        answer:
          "As many as you can keep up every week, including in your busiest month. A steady rhythm matters more than a high number, so choose the amount you can hold for a full quarter before judging it.",
      },
      {
        question: "What is batch content creation?",
        answer:
          "Batch creation means making a month's posts in a few focused sessions instead of one at a time: one shoot, one writing session, one editing session. It saves time and gives the month a consistent look.",
      },
      {
        question: "How do I measure a month of social media?",
        answer:
          "Measure it against the goal you set, such as enquiries, reach or sales. Then look at which posts were saved and shared, which format worked more than once, and what questions people asked.",
      },
      {
        question: "What should I do with posts that did not work?",
        answer:
          "Look for a pattern across the month before deciding. Drop a post type only if it underperformed more than once, and test one change at a time so you can tell what made the difference.",
      },
      {
        question: "Can one calendar cover more than one platform?",
        answer:
          "Yes, and it should. Keep one calendar with a column for each platform, so you can see at a glance what goes where. The same idea can appear on several platforms, shaped for each one.",
      },
      {
        question: "What should I do if I miss a week?",
        answer:
          "Pick up from the next planned post rather than trying to catch up with a burst. A missed week does little harm; a flood of posts to make up for it looks unplanned and tires people.",
      },
    ],
  },

  /*
   * The long version, rewritten on 2026-09-11. The four things a small budget
   * does are the four on the cover's rising bars, in order. No rupee figure,
   * benchmark or result appears anywhere: budgets and results vary by business,
   * and a number printed here would be read as a promise.
   */
  "what-a-small-ad-budget-can-actually-do": {
    intro: [
      "A small ad budget can still do four things well: put your business in front of the right people, earn real engagement, show you what works through testing, and build on what works over time. It cannot buy attention at scale, and early on it does not need to.",
      "A small budget cannot buy attention at scale. It can buy answers, and early on those are worth more. Below is what each of the four looks like in practice, how to set up a small campaign, and what to measure.",
    ],
    sections: [
      {
        id: "can-and-cannot",
        heading: "What a small budget can and cannot do",
        body: ["Knowing the limits up front is what stops a small budget being spent on the wrong job."],
        table: {
          caption: "Realistic and unrealistic goals for a small ad budget",
          head: ["Goal", "Realistic?", "Why"],
          rows: [
            ["Reach a defined local audience", "Yes", "Narrow targeting makes a small budget go further"],
            ["Find out which message works", "Yes", "Two versions of one ad answer the question quickly"],
            ["Back posts that already perform", "Yes", "Money helps a proven post reach more of the right people"],
            ["Collect enquiries or messages", "Yes, with patience", "Leads come steadily when the offer and audience are right"],
            ["Build awareness across a whole country", "Rarely", "The budget is spread too thin to be noticed"],
            ["Rescue weak creative", "No", "Budget makes a good post travel. It does not fix a bad one"],
          ],
        },
      },
      {
        id: "are-you-ready-to-spend",
        heading: "Are you ready to spend?",
        body: [
          "Money makes what you already have travel further, so it pays to check what you have first. If most of these are true, a small budget will teach you something. If not, fix these before spending.",
        ],
        list: [
          "**Some posts already earn attention unpaid.** Those are the ones worth putting money behind.",
          "**There is one clear offer.** A reason to act that fits in a sentence.",
          "**Someone can reply the same day.** Paid enquiries go cold quickly when they wait.",
          "**The profile is ready for visitors.** A clear bio, highlights, and an obvious way to get in touch.",
          "**You can tell where results came from.** A way to trace messages, leads or sales back to the ad.",
        ],
      },
      {
        id: "boost-or-ads-manager",
        heading: "Boosting a post, or a campaign in Ads Manager",
        body: [
          "There are two ways to pay for reach on Facebook and Instagram. Boosting is quicker; Ads Manager gives you more control. A small budget can use either, as long as you know what each is for.",
        ],
        table: {
          caption: "Boosting a post compared with running a campaign in Ads Manager",
          head: ["What you get", "Boosting a post", "A campaign in Ads Manager"],
          rows: [
            ["Where you set it up", "From the post itself, in the app", "In Meta Ads Manager"],
            ["Goals to choose from", "A short list, such as messages or profile visits", "The full set, including leads and sales"],
            ["Targeting", "Location, age and broad interests", "Detailed targeting, plus custom and lookalike audiences"],
            ["Testing two versions", "Not built in", "A/B testing is built in"],
            ["Best for", "A quick push behind a post that is already doing well", "A campaign with one goal that you want to learn from"],
          ],
        },
        after: [
          "Many small businesses start by boosting their best posts, then move to Ads Manager once they want to test and track properly.",
        ],
      },
      {
        id: "reach-the-right-people",
        heading: "Reach the right people",
        body: [
          "Even a small budget puts the brand in front of people who would never have found the page on their own, and it lets you choose who those people are.",
          "Narrow beats broad here. A small budget spread across everybody buys a little of nothing.",
        ],
        subsections: [
          {
            id: "targeting-options",
            heading: "Targeting options that stretch a small budget",
            body: ["Meta's ad tools, which run ads on Facebook and Instagram, offer several ways to narrow who sees an ad."],
            table: {
              caption: "Targeting options and when to use them",
              head: ["Option", "What it does", "Use it when"],
              rows: [
                ["Location radius", "Shows the ad to people near your business", "You serve customers in one area, like a restaurant or showroom"],
                ["Detailed targeting", "Uses interests and behaviours", "Your buyers share a clear interest, such as home decor"],
                ["Custom audiences", "Reaches people who already visited your site or engaged with your page", "You want to remind warm prospects"],
                ["Lookalike audiences", "Finds people similar to your existing customers or followers", "You have enough existing customers to learn from"],
              ],
            },
          },
        ],
      },
      {
        id: "earn-real-engagement",
        heading: "Earn real engagement",
        body: [
          "Good creative gets replies, saves and shares, and those keep working after the spending stops. Weak creative with money behind it reaches more people who ignore it.",
          "This is why the creative comes first. Budget makes a good post travel. It does not fix a bad one.",
        ],
        subsections: [
          {
            id: "creative-worth-paying-for",
            heading: "What makes creative worth paying for",
            body: [],
            list: [
              "**It works without sound.** On-screen text carries the message for people scrolling silently.",
              "**It says one thing.** One product, one offer, or one benefit per ad.",
              "**It looks like the feed.** Ads that look like ordinary posts are read; ads that look like ads are skipped.",
              "**It has one next step.** Message us, book a table, or shop now, and never all three.",
              "**It already worked unpaid.** A post that earned attention on its own is the safest thing to put money behind.",
            ],
            after: [
              "Making creative like this is what our [content creation](/services#content-creation) service does, and short videos for ads can be filmed on a phone using [these video shooting ideas](/blog/video-shooting-ideas-for-small-businesses).",
            ],
          },
        ],
      },
      {
        id: "learn-what-works",
        heading: "Learn what works",
        body: [
          "Running two versions of one idea against each other answers a question you would otherwise argue about for a month.",
          "Test one variable at a time, and keep the loser. Knowing which hook failed is as useful as knowing which one worked.",
        ],
        flow: {
          caption: "A simple A/B test",
          steps: [
            { title: "Pick one idea", text: "One product or offer you want to promote." },
            { title: "Make two versions", text: "Change only one thing between them: the hook, the image, or the offer." },
            { title: "Run them side by side", text: "Same audience, same budget, same dates." },
            { title: "Give it time", text: "Let both run long enough that one bad or good day does not decide it." },
            { title: "Keep the winner", text: "Put the budget behind it, and note what the loser taught you." },
          ],
        },
        subsections: [
          {
            id: "what-to-test-first",
            heading: "What to test first",
            body: [],
            table: {
              caption: "Variables worth testing, in a sensible order",
              head: ["Variable", "Example"],
              rows: [
                ["The hook", "Opening with the problem, or opening with the result"],
                ["The image or video", "The product alone, or the product in use"],
                ["The offer", "A discount, or a free consultation"],
                ["The call to action", "Send a message, or visit the website"],
                ["The audience", "A local radius, or an interest group"],
              ],
            },
          },
        ],
      },
      {
        id: "build-on-it",
        heading: "Build on it",
        body: [
          "Small, steady spending behind the posts that already earn attention on their own compounds. Occasional large spending on untested creative does not.",
          "The point of the first months is not the return. It is arriving at a format you trust, so a bigger budget later has something proven to sit behind.",
        ],
        table: {
          caption: "How a small budget can be used over the first months",
          head: ["Stage", "Where the money goes", "What you learn"],
          rows: [
            ["First month", "Testing two or three versions of one idea", "Which message and audience respond"],
            ["Second month", "Backing the winner, and testing one new variable", "Whether the result holds up"],
            ["Third month", "Widening the audience around what worked", "How far the format travels"],
            ["After that", "A steady budget behind proven ads", "What a bigger budget could do"],
          ],
        },
      },
      {
        id: "setting-up-a-small-campaign",
        heading: "Setting up a small campaign",
        body: ["The setup decides most of what a small budget can achieve. These steps keep it focused."],
        flow: {
          caption: "From goal to a running campaign",
          steps: [
            { title: "Pick one goal", text: "Enquiries, messages, website visits or sales. One, not several." },
            { title: "Choose the matching objective", text: "Meta's ad tools ask for an objective such as awareness, traffic, engagement, leads or sales. Pick the one that matches your goal." },
            { title: "Define a narrow audience", text: "A location, an interest, or people who already know you." },
            { title: "Prepare two creatives", text: "Two versions of one idea, differing in one thing, so the campaign teaches you something." },
            { title: "Set a budget you can hold", text: "An amount you could keep spending for the whole month without pausing." },
            { title: "Check it weekly", text: "Look at results once a week, and resist changing the ad every day." },
          ],
        },
        after: [
          "If you would rather have this set up and run for you, it is what our [campaign management](/services#campaign-management) service does.",
        ],
      },
      {
        id: "tracking-results-properly",
        heading: "Tracking results properly",
        body: [
          "A small budget is only useful if you can see what it produced. Set the tracking up before the first ad runs, not after, or the first month teaches you nothing.",
        ],
        table: {
          caption: "How to track each kind of result",
          head: ["Result", "How to track it"],
          rows: [
            ["Website enquiries and sales", "Install the Meta Pixel on your website, so actions taken there are counted against the ad"],
            ["WhatsApp conversations", "Use an ad that opens a WhatsApp chat, which counts the conversations it starts"],
            ["Form leads", "Use Meta's lead forms, which collect details without anyone leaving the app"],
            ["Link clicks to your site", "Add tagged links, so your website analytics shows which ad sent each visitor"],
            ["Phone calls and walk-ins", "Ask every new customer how they heard about you, and write it down"],
          ],
        },
      },
      {
        id: "what-to-measure",
        heading: "What to measure",
        body: ["Measure the ads against the goal you set, and use the other numbers to understand why."],
        table: {
          caption: "Ad metrics and what they tell you",
          head: ["Metric", "What it tells you", "Watch out for"],
          rows: [
            ["Results against your goal", "Messages, leads or sales the ad produced", "This is the number that matters most"],
            ["Cost per result", "What each message, lead or sale cost", "Compare it with what a customer is worth to you"],
            ["Click-through rate", "How many people who saw the ad acted on it", "A low rate usually points to the creative or the audience"],
            ["Frequency", "How often the same person saw the ad", "When it climbs, people start to tune the ad out"],
            ["Reach", "How many different people saw it", "Reach without results means the audience or offer is off"],
          ],
        },
      },
      {
        id: "reading-a-campaign",
        heading: "Reading a campaign after the first weeks",
        body: [
          "The numbers rarely say what to do on their own. Read them as patterns, and each pattern points to the part of the campaign to change.",
        ],
        table: {
          caption: "Common patterns in a small campaign, and what to try",
          head: ["What you see", "What it usually means", "What to try"],
          rows: [
            ["Plenty of reach, very few clicks", "The creative or the offer is not landing", "Test a new hook or image against the current one"],
            ["Clicks, but no enquiries", "The page people land on does not carry the ad's promise", "Make the profile or landing page match the ad"],
            ["Cost per result creeping up", "The same people are seeing the ad too often", "Refresh the creative, or widen the audience a little"],
            ["Messages, but few sales", "Replies are slow, or the offer attracts the wrong people", "Reply faster, and make the offer more specific"],
            ["Strong results that suddenly drop", "The audience has seen enough of this ad", "Bring in a new version of the idea that worked"],
          ],
        },
      },
      {
        id: "by-industry",
        heading: "Where to start, by industry",
        body: ["A small budget works best on the one campaign most likely to pay back. These are starting points for the industries Kalaa works with."],
        table: {
          caption: "A first campaign by industry",
          head: ["Industry", "A first campaign", "Goal to measure"],
          rows: [
            ["Restaurants and food", "A local radius, with a dish or offer, and a button to book or message", "Bookings and messages"],
            ["Interior design", "A carousel of finished rooms to homeowners nearby", "Enquiries for consultations"],
            ["Architecture", "A project showcase to people interested in building or renovating", "Enquiries"],
            ["Manufacturing and industry", "A product capability video to relevant business audiences", "Leads from buyers"],
            ["Import and export", "A clear offer or catalogue to a defined buyer audience", "Messages and leads"],
          ],
        },
      },
      {
        id: "a-worked-example-a-restaurants-first-month-of-ads",
        heading: "A worked example: a restaurant's first month of ads",
        body: [
          "Here is how a small restaurant might spend its first month with a modest budget. It illustrates the method rather than describing a real client, and it leaves the amounts out on purpose: the right amount is one you can hold for the whole month.",
        ],
        table: {
          caption: "One month of ads for a small restaurant, week by week",
          head: ["Week", "What runs", "What it teaches"],
          rows: [
            ["Week one", "Two versions of one dish video to people nearby, with a button to message", "Which opening gets people to stop and ask"],
            ["Week two", "Both keep running, unchanged", "Whether the early leader holds up past its first days"],
            ["Week three", "The winner keeps the budget, and a new offer is tested against it", "Whether an offer beats the dish on its own"],
            ["Week four", "The best version runs to a slightly wider area", "How far from the restaurant people will travel for it"],
          ],
        },
        after: [
          "At the end of the month the restaurant knows one message that works, one audience that responds, and roughly how far its customers will come. That is what the first month of a small budget is for.",
        ],
      },
      {
        id: "mistakes-that-waste-a-small-budget",
        heading: "Mistakes that waste a small budget",
        body: [],
        list: [
          "**Spreading it too thin** across several audiences, platforms or products at once.",
          "**Boosting weak posts** in the hope money will make them work.",
          "**Changing the ad every day,** which resets what the platform has learned and teaches you nothing.",
          "**Judging too early,** before the ad has had enough time and spend to show a pattern.",
          "**Leaving leads waiting.** A message answered the next day is often a customer lost.",
        ],
      },
      {
        id: "quick-reference",
        heading: "Quick reference",
        body: [],
        table: {
          caption: "What a small budget does, and how",
          head: ["What it does", "How to get it"],
          rows: [
            ["Reaches the right people", "Narrow targeting: location, interests, or people who know you"],
            ["Earns real engagement", "Creative that already worked unpaid, saying one thing"],
            ["Learns what works", "Two versions of one idea, changing one thing"],
            ["Builds on it", "Steady spending behind what is proven"],
          ],
        },
        after: [
          "If you want a small budget planned and run properly from the first month, [talk to Kalaa](/contact).",
        ],
      },
    ],
    faq: [
      {
        question: "How much should a small business spend on social media ads?",
        answer:
          "Spend an amount you can keep up for a whole month without pausing, and that you can afford to learn from. A steady budget over several weeks teaches you more than a larger amount spent in a few days.",
      },
      {
        question: "Are boosted posts worth it for a small business?",
        answer:
          "They can be, when you boost a post that is already performing well on its own and choose the audience carefully. Boosting a weak post only shows it to more people who will ignore it.",
      },
      {
        question: "Should a small business advertise on Facebook and Instagram or on Google?",
        answer:
          "It depends on how customers find you. Facebook and Instagram ads suit products and services people discover by seeing them. Search ads suit things people actively look for, such as a service they need today.",
      },
      {
        question: "How long does it take for ads to show results?",
        answer:
          "Give a campaign a few weeks before judging it, and check it weekly rather than daily. The first weeks are about learning which message and audience respond, and the results improve as you back what works.",
      },
      {
        question: "Can I run ads without a designer?",
        answer:
          "Yes. Ads that look like ordinary posts often do better than polished ones. A clear phone photo or short video, on-screen text, and one simple call to action are enough to start.",
      },
      {
        question: "What is the difference between boosting a post and running an ad?",
        answer:
          "Boosting puts money behind a post you have already published, with a short list of goals and simpler targeting. A campaign in Ads Manager gives you every goal, detailed targeting and built-in testing. Boosting is quicker; a campaign teaches you more.",
      },
      {
        question: "Do I need a website to run ads?",
        answer:
          "No. Ads can open a WhatsApp chat, a message thread or a lead form without anyone leaving the app. A website helps when you want people to buy online, or to read more detail before they get in touch.",
      },
    ],
  },
};
