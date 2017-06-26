1. cd into ClientServices and run 'npm install' to download all dependencies for ClientServices.
2. copy ThirdParty/frame/frame-master to ClientServices/node_modules/frame.
3. cd into ClientServices/node_modules/frame and run 'npm install' to download all dependencies for Frame. This will create a 'node_modules' folder under the 'frame' folder.
4. Perform the steps found in ThirdParty/frame and ThirdParty/simple-oauth-server.
5. cd into CongressDataRetrievalService and run 'npm install' to download all dependencies for CongressDataRetrievalService.
6. cd into Shared and run 'npm install' to download all dependencies for Shared.

Steps 2 and 3 may be performed with a more optimized command line npm install but I've forgotten how I did it (or even if I did it).
