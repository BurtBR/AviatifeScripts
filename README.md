# AviatifeScripts

- You can run these scripts directly in your browser's console, but if you want to automate the execution every time you enter the page, use an extension like Tampermonkey.

- If you use tampermonkey, go to the Aviatife page where you want the script to run, click on the tampermonkey extension and "create a new script". Then copy and paste the corresponding code and save. It should activate and run automatically when you refresh the page

- **This only edits what you see on the web page (the document), it doesn't change anything in the Aviatife database**

# Scripts Description

- CommodityTrashRemover:
  - Remove all commodities with "0 / 0 L / 0 kg" in your Business > Owned Commodities
    
- GroupCommodities:
  - Groups the same commodities at the same airport, combining their units, weight, value... in your Business > Owned Commodities
    
- RemoveUnusedCorporation:
  - Remove all buildings without employees in your Business > Corporation
    
- RemoveCancelledBuildings:
  - Remove all cancelled building in your Business > Rented Buildings
