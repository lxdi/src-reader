import os
import shutil
import subprocess
import sys

tomcatPath = 'c:\\Users\\Alexander\\Projects\\tomcats\\apache-tomcat-7.0.91-2'
destination = tomcatPath + '\\webapps\\ROOT\\pages'
source = 'build'
onlyCopy = False

for arg in sys.argv[1:]:
    if (arg == '--only-copy'):
        onlyCopy = True

if (onlyCopy is False):
    print("-----------------------------------------Compilation----------------------------------")
    process = subprocess.Popen(['npm', 'start'], shell=True, stdout = subprocess.PIPE)
    for line in process.stdout:
        print(line)
    process.wait()

    if process.returncode!=0 :
        print("------------------------------------Compilation ERROR----------------------------------------------------")
        exit(process.returncode)

print("-----------------------------------------Copying----------------------------------")
def copying(sourceDir, destinationDir):
    src_files = os.listdir(sourceDir)
    for file_name in src_files:
        full_file_name = os.path.join(sourceDir, file_name)
        if (os.path.isfile(full_file_name)):
            print(full_file_name + " to " +destinationDir)
            shutil.copy2(full_file_name, destinationDir)
        else:
            nextdestinationDir = os.path.join(destinationDir, file_name)
            print("/// copying from "+ full_file_name +" to " + nextdestinationDir)
            if not os.path.exists(nextdestinationDir):
                os.makedirs(nextdestinationDir)
            copying(full_file_name, nextdestinationDir)

copying(source, destination)
# src_files = os.listdir(source)
# for file_name in src_files:
#     full_file_name = os.path.join(source, file_name)
#     if (os.path.isfile(full_file_name)):
#         print(full_file_name + " to " +destination)
#         shutil.copy2(full_file_name, destination)

print("Success")
