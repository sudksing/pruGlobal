This directory contains a Jenkinsfile which can be used to build
pruGlobal using an OpenShift build pipeline.

To do this, run:

```bash
# create the nodejs example as usual
oc new-app https://github.com/sudksing/pruGlobal

# now create the pipeline build controller from the openshift/pipeline
# subdirectory
oc new-app https://github.com/sudksing/pruGlobal \
  --context-dir=openshift/pipeline --name pruGlobal-pipeline
```
