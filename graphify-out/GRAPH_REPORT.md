# Graph Report - .  (2026-06-16)

## Corpus Check
- Large corpus: 110 files · ~4,962,462 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 183 nodes · 252 edges · 19 communities (15 shown, 4 thin omitted)
- Extraction: 67% EXTRACTED · 32% INFERRED · 1% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Beauty & Self-Care Routines|Beauty & Self-Care Routines]]
- [[_COMMUNITY_Home, Wardrobe & Finance Logic|Home, Wardrobe & Finance Logic]]
- [[_COMMUNITY_Hair-Care Product Lineup|Hair-Care Product Lineup]]
- [[_COMMUNITY_Acrylic Nail Process|Acrylic Nail Process]]
- [[_COMMUNITY_Microneedling & Serums|Microneedling & Serums]]
- [[_COMMUNITY_Website JavaScript Engine|Website JavaScript Engine]]
- [[_COMMUNITY_Press-On Nail Process|Press-On Nail Process]]
- [[_COMMUNITY_Fur-Coat Fashion Editorials|Fur-Coat Fashion Editorials]]
- [[_COMMUNITY_Ethereal Forest Portraits|Ethereal Forest Portraits]]
- [[_COMMUNITY_Sir Mao & Self-Portraits|Sir Mao & Self-Portraits]]
- [[_COMMUNITY_Modeling Portfolio & Booking|Modeling Portfolio & Booking]]
- [[_COMMUNITY_Manicure Photo Cluster|Manicure Photo Cluster]]
- [[_COMMUNITY_Randy Gingham Series|Randy Gingham Series]]
- [[_COMMUNITY_Marz Christmas Series|Marz Christmas Series]]
- [[_COMMUNITY_This Guy's Dope Studio Series|This Guy's Dope Studio Series]]
- [[_COMMUNITY_Nitrile Glove Product|Nitrile Glove Product]]
- [[_COMMUNITY_CHI 44 Heat Spray|CHI 44 Heat Spray]]
- [[_COMMUNITY_Silicone Applicator Brushes|Silicone Applicator Brushes]]
- [[_COMMUNITY_JeshCuhh Brand Index|JeshCuhh Brand Index]]

## God Nodes (most connected - your core abstractions)
1. `Beauty & Self-Care Index` - 10 edges
2. `Dermaplaner` - 10 edges
3. `At-Home Microneedling` - 10 edges
4. `Hair Toning` - 9 edges
5. `Going-Out Makeup` - 7 edges
6. `At-Home Press-On Acrylic` - 7 edges
7. `Skincare Daily Ritual` - 7 edges
8. `Hair Care` - 6 edges
9. `Spending vs Savings (Stonks)` - 6 edges
10. `Where the Dollar Goes (Cost Breakdown)` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Jewellery Valuation Calculator` --semantically_similar_to--> `S&P 500-Style Compounding Projection`  [INFERRED] [semantically similar]
  wardrobe/jewelry.html → finance-investing/stonks.html
- `Aesthetic Escalation Pyramid` --semantically_similar_to--> `S&P 500-Style Compounding Projection`  [INFERRED] [semantically similar]
  home-lifestyle/opinion-procedure.html → finance-investing/stonks.html
- `Quiet-Luxury Material Palette` --semantically_similar_to--> `Quiet-Luxury Capsule Shopping Logic`  [INFERRED] [semantically similar]
  home-lifestyle/decor.html → wardrobe/wardrobe.html
- `Gemstone & Metal Durability Tier List` --semantically_similar_to--> `Masstige (Mass-Prestige) Value Logic`  [INFERRED] [semantically similar]
  wardrobe/jewelry.html → home-lifestyle/masstige.html
- `Masstige (Mass-Prestige) Value Logic` --semantically_similar_to--> `Quiet-Luxury Capsule Shopping Logic`  [INFERRED] [semantically similar]
  home-lifestyle/masstige.html → wardrobe/wardrobe.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **DIY Cost Breakdown Across Beauty Pages** — beautyselfcare_dermaplaner, beautyselfcare_hairtoning, beautyselfcare_microneedling, beautyselfcare_pressonnail, shared_measure_dollar [EXTRACTED 0.85]
- **Beauty Savings Routed to Finance Category** — shared_measure_dollar, shared_diy_savings, financeinvesting_stonks, financeinvesting_invest_moneysystem [INFERRED 0.75]
- **Wardrobe Care & Capsule Cluster** — wardrobe_capsule_wardrobe, wardrobe_care_wardrobe_care, shoe_care_shoe_care, jewelry_jewelry [EXTRACTED 1.00]
- **Home & Lifestyle Taste Cluster** — decor_decor, masstige_masstige, opinion_procedure_opinion_procedure [EXTRACTED 1.00]
- **Quiet-Luxury Value & Durability Theme** — masstige_concept, decor_material_palette, wardrobe_quiet_luxury_shopping, jewelry_gemstone_tier_list [INFERRED 0.85]
- **Hair Care Product Lineup** — images_garnierfructisoil, images_minoxidil, images_oribe, images_pureology, images_redkennight [INFERRED 0.95]
- **Microneedling tools and prep** — images_derm2_derminator2, images_buff_microneedling_pen, images_buff_alcohol_prep_pad [INFERRED 0.75]
- **Skincare active-ingredient serums** — images_pdrn_rejuran_ampoule, images_ha_cos_de_baha_serum, images_pdrn_pdrn [INFERRED 0.75]
- **Acrylic nail application process steps** — images_nail_fill, images_nail_dip_mono, images_nail_dip_acr, images_nail_bead, images_nail_apply_bead, images_nail_drill, images_nail_45 [INFERRED 0.75]
- **Acrylic nail materials and tools** — concept_monomer_liquid, concept_acrylic_powder, concept_dappen_dish [INFERRED 0.75]
- **Press-on nail application process** — concept_supplies_prep, concept_nail_filing, concept_nail_priming, concept_nail_swiping, concept_nail_smoothing, concept_presson_application [INFERRED 0.75]
- **fur/coat wardrobe & modeling series** — images_bw_fur_coat_fab_rice, images_on_nuu_fab_rice, images_mink_fur_linen_sir_mao_ed, images_mink_fur_linen_sir_mao_ed_smile, images_mink_fur_linen_sir_mao_ed_smile2 [INFERRED 0.85]
- **Alien-themed ethereal portrait series** — images_alien_green_white_random, images_alien_life, images_alien_red [INFERRED 0.85]
- **Sir Mao portrait set** — images_sir_mao_smile, images_sir_mao_smirk, concept_sir_mao [INFERRED 0.75]
- **Marz Christmas light-ball shoot** — images_marz_smile_ball_red_xmas, images_marz_half_smile_ball_red_xmas, concept_marz [INFERRED 0.75]
- **Self-portrait set (face and hand)** — images_mah_face_2026, images_mahhand, concept_self_portrait [INFERRED 0.75]
- **'this guy's dope' studio portrait series** — images_thisguysdope2, images_thisguysdope3 [INFERRED 0.85]
- **Randy gingham-dress portrait series** — images_randy_stripe, images_randy2, images_randy3 [INFERRED 0.85]
- **Nail care / manicure photo cluster** — images_img_3389, images_img_3419, images_image [INFERRED 0.75]

## Communities (19 total, 4 thin omitted)

### Community 0 - "Beauty & Self-Care Routines"
Cohesion: 0.08
Nodes (41): Dermaplaner, Leaf Shave Dermaplaner, Mechanical Exfoliation, Hair Care, Bond Repair Hair Philosophy, Chi 44 Iron Guard Heat Protectant, Hair Toning, Olaplex No. 1 (+33 more)

### Community 1 - "Home, Wardrobe & Finance Logic"
Cohesion: 0.17
Nodes (20): Decor, Quiet-Luxury Material Palette, Home & Lifestyle Index, Gemstone & Metal Durability Tier List, Jewelry, Jewellery Valuation Calculator, Masstige (Mass-Prestige) Value Logic, Masstige (+12 more)

### Community 2 - "Hair-Care Product Lineup"
Cohesion: 0.17
Nodes (15): BLT Numbing Cream (Benzocaine/Lidocaine/Tetracaine), Garnier Fructis Sleek & Shine Anti-Frizz Serum, Hair Care Products, Kirkland Minoxidil Hair Regrowth Foam, Magnanni (Footwear/Accessory Brand), Oribe Supershine Moisturizing Cream, Pureology Color Fanatic Leave-In Spray, Redken Acidic Bonding Concentrate Treatment (+7 more)

### Community 3 - "Acrylic Nail Process"
Cohesion: 0.21
Nodes (14): Acrylic nail application process, Acrylic powder, Applying and shaping the bead on nail, Dappen dish, Drilling and filing the cured nail, Forming the acrylic bead, Monomer liquid, Filed acrylic nails at 45-degree side view (+6 more)

### Community 4 - "Microneedling & Serums"
Cohesion: 0.20
Nodes (14): Hand using microneedling pen with alcohol prep pads (image), Alcohol Prep Pad, Microneedling Pen in Use, Derminator 2 Digital Skin Remodeling Device, Derminator 2 microneedling device (image), Microneedling, Derminator 2 device with needle cartridges (image), Cos De BAHA Hyaluronic Acid Serum (image) (+6 more)

### Community 5 - "Website JavaScript Engine"
Cohesion: 0.19
Nodes (6): applyTheme(), currentTheme(), init(), next(), prev(), render()

### Community 6 - "Press-On Nail Process"
Cohesion: 0.17
Nodes (13): Nail filing / shaping, Nail priming, Nail surface smoothing, Product swiping / brush application, Press-on nail application, Tool and supply preparation, Applying nail primer with brush applicator, Smoothing nail surface with flat brush (+5 more)

### Community 7 - "Fur-Coat Fashion Editorials"
Cohesion: 0.44
Nodes (10): fashion modeling, fur coat, fur-collar bomber jacket, mink coat, satin dress, B&W portrait: woman in white fur coat over satin dress, garden, Outdoor portrait: woman in black fur-collar bomber jacket, white shirt, cream pants, on road, Outdoor portrait: woman in black fur-collar bomber jacket, white shirt, smiling, leaning on post (+2 more)

### Community 8 - "Ethereal Forest Portraits"
Cohesion: 0.47
Nodes (9): Ethereal otherworldly portrait aesthetic, Nature-set fashion portraiture, Soft golden backlight treatment, Marina sunset portrait in brown leather coat and cap, Ethereal forest portrait in sheer white dress amid ivy trees, Misty enchanted-forest portrait in beige slip dress, Woodland boudoir portrait in flowing white gown on dirt path, Sunlit forest portrait in rust-red textured gown (+1 more)

### Community 9 - "Sir Mao & Self-Portraits"
Cohesion: 0.40
Nodes (6): Self-portrait subject (mah face / mah hand), Sir Mao (named subject), Self-portrait 2026 - face with monstera leaves, Self-portrait - hand with manicured nails, Sir Mao - soft smile portrait, Sir Mao - smirk portrait

### Community 10 - "Modeling Portfolio & Booking"
Cohesion: 0.40
Nodes (5): Bookings, Session Tiers & Seasonal Pricing, Portfolio Index, Modeling Portfolio, Editorial Visual Identity & Brand Direction

### Community 11 - "Manicure Photo Cluster"
Cohesion: 0.67
Nodes (4): Nail care / manicure photo cluster, Single finger pointing down showing long nude press-on nail, Close-up: hand with long nails holding antiseptic/burn-gel packet and silver tool, Two hands clasped showing nude almond manicure with chrome and pearl accents

### Community 12 - "Randy Gingham Series"
Cohesion: 1.00
Nodes (4): Randy portrait series (gingham dress fashion shoot), Outdoor portrait of Randy in gingham dress among pink blossoms (rotated), Rooftop portrait of Randy in gingham dress with brown handbag, skyline (rotated), Rooftop portrait of Randy: woman in gingham dress shielding eyes, city skyline

### Community 13 - "Marz Christmas Series"
Cohesion: 1.00
Nodes (3): Marz (named subject), Marz - half smile/pout, red dress, Christmas light ball, Marz - full smile, red dress, Christmas light ball

### Community 14 - "This Guy's Dope Studio Series"
Cohesion: 1.00
Nodes (3): 'this guy's dope' studio portrait series (rattan chair, qipao), Studio portrait: woman in gold floral qipao seated on rattan peacock chair, Red-lit studio portrait: woman seated on rattan peacock chair, dramatic gel lighting

## Ambiguous Edges - Review These
- `Magnanni Hard Case Image (AMBIGUOUS)` → `Hair Care Products`  [AMBIGUOUS]
  assets/images/horseHair.jpg · relation: conceptually_related_to
- `Indoor lifestyle portrait in blue knit top by window` → `Ethereal otherworldly portrait aesthetic`  [AMBIGUOUS]
  assets/images/blue.png · relation: conceptually_related_to

## Knowledge Gaps
- **41 isolated node(s):** `Protocol Accordion Interaction`, `Modeling Portfolio`, `Leaf Shave Dermaplaner`, `Redken Shades EQ Demi-Permanent Gloss`, `Chi 44 Iron Guard Heat Protectant` (+36 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Magnanni Hard Case Image (AMBIGUOUS)` and `Hair Care Products`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Indoor lifestyle portrait in blue knit top by window` and `Ethereal otherworldly portrait aesthetic`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What connects `Quiet Luxury / Old Money Design Direction`, `Protocol Accordion Interaction`, `Modeling Portfolio` to the rest of the system?**
  _50 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Beauty & Self-Care Routines` be split into smaller, more focused modules?**
  _Cohesion score 0.08170731707317073 - nodes in this community are weakly interconnected._