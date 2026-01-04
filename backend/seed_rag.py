import requests
import json
import time

BASE_URL = "http://localhost:8000"

# Mock Documents for 3 Projects
projects_data = [
    {
        "id": "1",
        "name": "Amazon Reforestation Alpha",
        "documents": [
            {
                "title": "Project Design Document (PDD)",
                "content": """
**Project Design Document: Amazon Reforestation Alpha**
**Project ID:** VCS-1923
**Location:** Pará, Brazil
**Date:** 2024-01-15

**1. Project Description**
The Amazon Reforestation Alpha project aims to restore 1,500 hectares of illegal pasture land back to native rainforest. The project area serves as a critical biological corridor connecting two fragmented reserves.

**2. Methodology**
This project applies the VCS Methodology VM0007: REDD+ Methodology Framework (REDD+ MF).
- **Baseline Scenario:** Continued degradation by illegal cattle ranching.
- **Project Scenario:** Assisted natural regeneration and active planting of 20 native tree species.

**3. Additionality**
Without carbon finance, the land would remain degraded due to the high cost of reforestation and lack of government enforcement in the region.
"""
            },
            {
                "title": "Validation Report 2024",
                "content": """
**Validation Report**
**Auditor:** GreenCheck Certifications
**Date:** 2024-03-10

**Conclusion:**
The project complies with all verifiable requirements of the VCS Standard v4.
- **Land Eligibility:** Confirmed via satellite analysis (Landsat 8) dating back to 2010.
- **Stakeholder Consultation:** Meetings held with 3 local villages. Minutes attached in Appendix B.
"""
            },
            {
                "title": "Monitoring Report Q1 2024",
                "content": """
**Monitoring Report Q1 2024**
**Period:** Jan 1, 2024 - Mar 31, 2024

**1. Survival Rates**
50,000 saplings were planted. Field surveys in Plot A and B show a 92% survival rate.
- **Key Species:** Mahogany (Swietenia macrophylla), Brazil Nut (Bertholletia excelsa).

**2. Biodiversity Observations**
- **Jaguar (Panthera onca):** Tracks sighted in Sector 4.
- **Harpy Eagle:** Nesting site confirmed near the river boundary.

**3. Carbon Calculations**
Based on biomass growth equations, the project sequestered 25,000 tCO2e this quarter.
"""
            },
            {
                "title": "Social Impact Assessment",
                "content": """
**Social Co-Benefits Report**

**Employment:**
- 120 full-time jobs created for local residents (nursery management, planting, guarding).
- 40% of workforce are women.

**Education:**
- 500 families participated in "Sustainable Agroforestry" workshops.
- A new community center was funded by initial credit pre-sales.
"""
            }
        ]
    },
    {
        "id": "2",
        "name": "Solar Farm Alpha",
        "documents": [
             {
                "title": "Technical Specification & PDD",
                "content": """
**Project Design Document: Solar Farm Alpha**
**Location:** Gujarat, India
**Capacity:** 50 MW
**Methodology:** ACM0002 - Grid-connected electricity generation from renewable sources.

**1. Project Activity**
Installation of 150,000 PV modules to supply clean energy to the regional grid, replacing coal-based power.
**2. Technology**
Monocrystalline silicon panels with 21% efficiency rating.
"""
            },
            {
                "title": "Environmental Impact Assessment (EIA)",
                "content": """
**EIA Executive Summary**
**Impact on Land:** The project uses barren wasteland not suitable for agriculture.
**Water Usage:** Robotic dry-cleaning technology is used for panels to minimize water consumption in this arid region.
**Grid Stability:** The plant includes a 10MWh battery storage pilot to assist with peak load leveling.
"""
            },
            {
                "title": "Verification Report 2023",
                "content": """
**Verification Period:** Jan 1, 2023 - Dec 31, 2023
**Net Generation:** 85,000 MWh verified by meter readings.
**Grid Emission Factor:** 0.92 tCO2/MWh.
**Total Emission Reductions:** 78,200 tCO2e issued.
"""
            },
            {
                "title": "Community Development Report",
                "content": """
**CSR Initiatives**
- **Healthcare:** Mobile clinic sponsored by the project visits 5 neighboring villages weekly.
- **Energy Access:** Installed off-grid solar streetlights in 3 un-electrified hamlets.
"""
            }
        ]
    },
    {
        "id": "3",
        "name": "Clean Water Initiative",
        "documents": [
            {
                "title": "Project Description (Gold Standard)",
                "content": """
**Project: Clean Water Initiative Kenya**
**Target Area:** Rural communities in Kakamega County.
**Methodology:** GS TPDDTEC - Technologies and Practices to Displace Decentralized Thermal Energy Consumption.

**Problem:** Families boil water using wood fuels, causing deforestation and indoor air pollution.
**Solution:** Distribution of 10,000 gravity-fed water filters (LifeStraw Family 2.0).
"""
            },
             {
                "title": "Health Impact Study",
                "content": """
**Health Outcomes Report 2023**
- **Diarrhea Reduction:** Incidents of waterborne illness dropped by 65% in participating households.
- **Respiratory Health:** Reduced smoke exposure reported by 80% of women, as boiling is no longer needed.
"""
            },
            {
                "title": "Usage Survey Q4",
                "content": """
**Usage Survey Results**
Sample size: 500 households.
- **Usage Rate:** 94% of filters are in daily use 1 year after distribution.
- **Maintenance:** 98% of filters verified as functional during spot checks.
"""
            },
             {
                "title": "Carbon Monitoring Report",
                "content": """
**Emission Reductions**
- **Wood Saving:** Average 2.5 kg of firewood saved per day per household.
- **Avoided Emissions:** 25,000 tCO2e verified for the monitoring period.
"""
            }
        ]
    },
    {
        "id": "4",
        "name": "Wind Power Expansion",
        "documents": [
            {
                "title": "Project Design Document (PDD)",
                "content": """
**Project Design Document: Wind Power Expansion**
**Location:** Texas, USA
**Capacity:** 120 MW
**Standard:** VCS + Climate, Community & Biodiversity (CCB) Standards

**1. Project Overview**
Expansion of an existing wind farm by adding 40 new 3MW turbines. The project feeds directly into the ERCOT grid, displacing electricity from natural gas peaking plants.

**2. Technological Specification**
- **Turbines:** Vestas V90-3.0 MW.
- **Hub Height:** 80 meters.
- **Rotor Diameter:** 90 meters.
"""
            },
            {
                "title": "Avian Impact Assessment",
                "content": """
**Avian & Bat Monitoring Report 2023**
**Auditor:** Environmental Assessment Grp.

**Results:**
- **Radar Systems:** Installed avian radar detection to shut down turbines during high migration activity.
- **Mortality Rates:** 0.5 birds/MW/year, significantly below the regional average of 2.3 birds/MW/year.
"""
            },
            {
                "title": "Noise Impact Study",
                "content": """
**Acoustic Monitoring Report**
**Distance to nearest residence:** 1.2 km.
**Compliance:** Noise levels at nearest dwelling do not exceed 40 dB(A) at night, complying with local ordinances and WHO guidelines.
"""
            },
            {
                "title": "Verification Report 2023",
                "content": """
**Annual Verification Statement**
**Period:** Jan 1, 2023 - Dec 31, 2023
**Net Generation:** 350,000 MWh.
**Displaced Emissions:** 150,000 tCO2e verified.
"""
            }
        ]
    },
    {
        "id": "5",
        "name": "Mangrove Restoration",
        "documents": [
            {
                "title": "Blue Carbon PDD",
                "content": """
**Project Design Document: Sumatra Blue Carbon**
**Location:** North Sumatra, Indonesia
**Area:** 2,000 Hectares
**Methodology:** VM0033 - Methodology for Tidal Wetland and Seagrass Restoration.

**1. Project Goal**
Restoration of abandoned shrimp ponds back to productive mangrove ecosystems. Mangroves sequester carbon at 4x the rate of terrestrial forests.

**2. Carbon Pools**
- **Above-ground biomass:** Trees and roots.
- **Soil Organic Carbon:** Deep peat soils (up to 3 meters).
"""
            },
            {
                "title": "Soil Analysis Report",
                "content": """
**Soil Carbon Stock Assessment**
**Date:** March 2024
**Technique:** Core sampling at 50 locations.
**Results:** Average soil carbon density increased from 150 tC/ha (degraded) to 320 tC/ha (restored) over the last 5 years.
"""
            },
            {
                "title": "Community Livelihood Plan",
                "content": """
**Sustainable Livelihoods Report**
**Crab Farming:**
- Integration of silvofishery (crabs + mangroves) provides income for 200 families without cutting down trees.
- **Income Increase:** Participating families reported a 30% increase in monthly household income.

**Women's Cooperative:**
- Established a cooperative for processing mangrove fruit into syrup and chips.
"""
            },
             {
                "title": "Satellite Monitoring Q2 2024",
                "content": """
**Remote Sensing Analysis**
**Sensor:** Sentinel-2
**NDVI Analysis:**
- 95% of planted areas show healthy vegetation index (>0.6).
- **Illegal Logging:** No alerts detected in the project boundary this quarter.
"""
            }
        ]
    }
]

def seed():
    print("Starting Comprehensive RAG Seeding...")
    
    for project in projects_data:
        print(f"\n--- Processing Project: {project['name']} (ID: {project['id']}) ---")
        
        full_text_corpus = ""
        for doc in project['documents']:
             full_text_corpus += f"\n\n--- DOCUMENT: {doc['title']} ---\n{doc['content']}"

        # Indexing the full corpus for the project
        try:
            payload = {
                "project_id": project["id"],
                "text": full_text_corpus
            }
            res = requests.post(f"{BASE_URL}/ai/index-document", json=payload)
            if res.status_code == 200:
                print(f"Successfully indexed {len(project['documents'])} documents.")
            else:
                print(f"Failed to index: {res.text}")
        except Exception as e:
            print(f"Error indexing: {e}")
            
    print("\n\nSeeding Complete! RAG is now ready with multi-document context.")

if __name__ == "__main__":
    seed()
